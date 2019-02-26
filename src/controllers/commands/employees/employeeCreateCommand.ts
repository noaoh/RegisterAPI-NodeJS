import Bluebird from "bluebird";
import Sequelize from "sequelize";
import * as Helper from "../helpers/helper";
import { ErrorCodeLookup } from "../../lookups/stringLookup";
import * as DatabaseConnection from "../models/databaseConnection";
import * as EmployeeRepository from "../models/repositories/employeeRepository";
import { CommandResponse, Employee, EmployeeSaveRequest } from "../../typeDefinitions";
import { EmployeeInstance, EmployeeAttributes } from "../models/entities/employeeEntity";

// Create Hah for password
const hash = crypto.createHash('sha256');
const password = hash.update(password).digest('hex');

const validateSaveRequest = (saveEmployeeRequest: EmployeeSaveRequest): CommandResponse<Employee> => {
	const validationResponse: CommandResponse<Employee> =
		<CommandResponse<Employee>>{ status: 200 };

	if ((saveEmployeeRequest.password == null) || (saveEmployeeRequest.password.trim() === "")) {
		validationResponse.status = 422;
		validationResponse.message = ErrorCodeLookup.EC2026;
	} else if ((saveEmployeeRequest.employee_id == null) || isNaN(saveEmployeeRequest.employee_id)) {
		validationResponse.status = 422;
		validationResponse.message = ErrorCodeLookup.EC2027;
	} else if (saveEmployeeRequest.employee_id < 0) {
		validationResponse.status = 422;
		validationResponse.message = ErrorCodeLookup.EC2028;
	}

	return validationResponse;
};

export let execute = (saveEmployeeRequest: EmployeeSaveRequest): Bluebird<CommandResponse<Employee>> => {
	const validationResponse: CommandResponse<Employee> = validateSaveRequest(saveEmployeeRequest);
	if (validationResponse.status !== 200) {
		return Bluebird.reject(validationResponse);
	}

	const employeeToCreate: EmployeeAttributes = <EmployeeAttributes>{
		employee_id: saveEmployeeRequest.employee_id,
		password: saveEmployeeRequest.password
	};

	let createTransaction: Sequelize.Transaction;

	return DatabaseConnection.startTransaction()
		.then((createdTransaction: Sequelize.Transaction): Bluebird<EmployeeInstance | null> => {
			createTransaction = createdTransaction;

			return EmployeeRepository.queryByLookupCode(
				saveEmployeeRequest.password,
				createTransaction);
		}).then((existingEmployee: (EmployeeInstance | null)): Bluebird<EmployeeInstance> => {
			if (existingEmployee != null) {
				return Bluebird.reject(<CommandResponse<Employee>>{
					status: 409,
					message: ErrorCodeLookup.EC2029
				});
			}

			return EmployeeRepository.create(employeeToCreate, createTransaction);
		}).then((createdEmployee: EmployeeInstance): Bluebird<CommandResponse<Employee>> => {
			createTransaction.commit();

			return Bluebird.resolve(<CommandResponse<Employee>>{
				status: 201,
				data: <Employee>{
					id: createdEmployee.id,
					lastName: createdEmployee.lastName,
					firstName: createdEmployee.firstName,
					employee_id: createdEmployee.employee_id,
					classification: createdEmployee.classification,
					password: createdEmployee.password,
					createdOn: Helper.formatDate(createdEmployee.createdOn),
					manager: createdEmployee.manager,
					active: createdEmployee.active
				}
			});
		}).catch((error: any): Bluebird<CommandResponse<Employee>> => {
			if (createTransaction != null) {
				createTransaction.rollback();
			}

			return Bluebird.reject(<CommandResponse<Employee>>{
				status: (error.status || 500),
				message: (error.message || ErrorCodeLookup.EC1002)
			});
		});
};
