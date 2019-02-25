import Bluebird from "bluebird";
import Sequelize from "sequelize";
import * as Helper from "../helpers/helper";
import { ErrorCodeLookup } from "../../lookups/stringLookup";
import * as DatabaseConnection from "../models/databaseConnection";
import * as EmployeeRepository from "../models/repositories/employeeRepository";
import { CommandResponse, Employee, EmployeeSaveRequest } from "../../typeDefinitions";
import { EmployeeInstance, EmployeeAttributes } from "../models/entities/employeeEntity";

const validateSaveRequest = (saveEmployeeRequest: EmployeeSaveRequest): CommandResponse<Employee> => {
	const validationResponse: CommandResponse<Employee> =
		<CommandResponse<Employee>>{ status: 200 };

	if ((saveEmployeeRequest.lookupCode == null) || (saveEmployeeRequest.lookupCode.trim() === "")) {
		validationResponse.status = 422;
		validationResponse.message = ErrorCodeLookup.EC2026;
	} else if ((saveEmployeeRequest.count == null) || isNaN(saveEmployeeRequest.count)) {
		validationResponse.status = 422;
		validationResponse.message = ErrorCodeLookup.EC2027;
	} else if (saveEmployeeRequest.count < 0) {
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
		count: saveEmployeeRequest.count,
		lookupCode: saveEmployeeRequest.lookupCode
	};

	let createTransaction: Sequelize.Transaction;

	return DatabaseConnection.startTransaction()
		.then((createdTransaction: Sequelize.Transaction): Bluebird<EmployeeInstance | null> => {
			createTransaction = createdTransaction;

			return EmployeeRepository.queryByLookupCode(
				saveEmployeeRequest.lookupCode,
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
					employee_id: createdEmployee.employeeID,
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
