import Bluebird from "bluebird";
import Sequelize from "sequelize";
import * as Helper from "../helpers/helper";
import { ErrorCodeLookup } from "../../lookups/stringLookup";
import { EmployeeInstance } from "../models/entities/employeeEntity";
import * as DatabaseConnection from "../models/databaseConnection";
import * as EmployeeRepository from "../models/repositories/employeeRepository";
import { CommandResponse, Employee, EmployeeSaveRequest } from "../../typeDefinitions";
import * as crypto from "crypto";

const validateSaveRequest = (saveEmployeeRequest: EmployeeSaveRequest): CommandResponse<Employee> => {
	const validationResponse: CommandResponse<Employee> =
		<CommandResponse<Employee>>{status: 200};

	if ((saveEmployeeRequest.password == null) || (saveEmployeeRequest.password.trim() === "")) {
		validationResponse.status = 422;
		validationResponse.message = ErrorCodeLookup.EC2026;
	}

	return validationResponse;
};

export let execute = (saveEmployeeRequest: EmployeeSaveRequest): Bluebird<CommandResponse<Employee>> => {
	const validationResponse: CommandResponse<Employee> = validateSaveRequest(saveEmployeeRequest);
	if (validationResponse.status !== 200) {
		return Bluebird.reject(validationResponse);
	}

	let updateTransaction: Sequelize.Transaction;

	return DatabaseConnection.startTransaction()
		.then((startedTransaction: Sequelize.Transaction): Bluebird<EmployeeInstance | null> => {
			updateTransaction = startedTransaction;

			return EmployeeRepository.queryById(<string>saveEmployeeRequest.id, updateTransaction);
		}).then((queriedEmployee: (EmployeeInstance | null)): Bluebird<EmployeeInstance> => {
			if (queriedEmployee == null) {
				return Bluebird.reject(<CommandResponse<Employee>>{
					status: 404,
					message: ErrorCodeLookup.EC1001
				});
			}

			const hash = crypto.createHash("sha256");
			return queriedEmployee.update(
				<Object>{
					employee_id: saveEmployeeRequest.employeeid,
					lastName: saveEmployeeRequest.lastName,
					firstName: saveEmployeeRequest.firstName,
					classification: saveEmployeeRequest.classification,
					password: hash.update(saveEmployeeRequest.password).digest("hex"),
					manager: saveEmployeeRequest.manager,
					active: saveEmployeeRequest.active
				},
				<Sequelize.InstanceUpdateOptions>{transaction: updateTransaction});
		}).then((updatedEmployee: EmployeeInstance): Bluebird<CommandResponse<Employee>> => {
			updateTransaction.commit();

			return Bluebird.resolve(<CommandResponse<Employee>>{
				status: 200,
				data: <Employee>{
					id: updatedEmployee.id,
					lastName: updatedEmployee.lastName,
					firstName: updatedEmployee.firstName,
					employeeid: updatedEmployee.employeeid,
					classification: updatedEmployee.classification,
					password: updatedEmployee.password,
					manager: updatedEmployee.manager,
					active: updatedEmployee.active
				}
			});
		}).catch((error: any): Bluebird<CommandResponse<Employee>> => {
			console.log(error);
			if (updateTransaction != null) {
				updateTransaction.rollback();
			}

			return Bluebird.reject(<CommandResponse<Employee>>{
				status: (error.status || 500),
				message: (error.messsage || ErrorCodeLookup.EC1002)
			});
		});
};
