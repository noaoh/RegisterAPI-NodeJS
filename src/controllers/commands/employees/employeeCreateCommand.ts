import Bluebird from "bluebird";
import Sequelize from "sequelize";
import * as Helper from "../helpers/helper";
import { ErrorCodeLookup } from "../../lookups/stringLookup";
import * as DatabaseConnection from "../models/databaseConnection";
import * as EmployeeRepository from "../models/repositories/employeeRepository";
import { CommandResponse, Employee, EmployeeSaveRequest } from "../../typeDefinitions";
import { EmployeeInstance, EmployeeAttributes } from "../models/entities/employeeEntity";
import * as crypto from "crypto";

// Create Hash for password
// const crypto = require("crypto");
// password = hash.update(password).digest("hex");

const validateSaveRequest = (saveEmployeeRequest: EmployeeSaveRequest): CommandResponse<Employee> => {
	console.log(saveEmployeeRequest);
	const validationResponse: CommandResponse<Employee> =
		<CommandResponse<Employee>>{ status: 200 };

	if ((saveEmployeeRequest.password == null) || (saveEmployeeRequest.password.trim() === "")) {
		validationResponse.status = 422;
		validationResponse.message = "Hello World 1";
	} else if (saveEmployeeRequest.active == null) {
		validationResponse.status = 422;
		validationResponse.message = "Hello World 2";
	} else if (saveEmployeeRequest.classification == null || saveEmployeeRequest.classification.trim() === "") {
		validationResponse.status = 422;
		validationResponse.message = "Hello World 3";
	}

	console.log(validationResponse);
	return validationResponse;
};

export let execute = (saveEmployeeRequest: EmployeeSaveRequest): Bluebird<CommandResponse<Employee>> => {
	const validationResponse: CommandResponse<Employee> = validateSaveRequest(saveEmployeeRequest);
	if (validationResponse.status !== 200) {
		return Bluebird.reject(validationResponse);
	}

	const hash = crypto.createHash("sha256");
	const employeeToCreate: EmployeeAttributes = <EmployeeAttributes>{
		password: hash.update(saveEmployeeRequest.password).digest("hex"),
		lastName: saveEmployeeRequest.lastName,
		firstName: saveEmployeeRequest.firstName,
		classification: saveEmployeeRequest.classification,
		active: saveEmployeeRequest.active,
		manager: saveEmployeeRequest.manager
	};

	let createTransaction: Sequelize.Transaction;

	return DatabaseConnection.startTransaction()
		.then((createdTransaction: Sequelize.Transaction): Bluebird<EmployeeInstance | null> => {
			createTransaction = createdTransaction;

			return EmployeeRepository.queryByEmployeeID(
				saveEmployeeRequest.employeeid,
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
					employeeid: createdEmployee.employeeid,
					classification: createdEmployee.classification,
					password: createdEmployee.password,
					createdOn: Helper.formatDate(createdEmployee.createdOn),
					manager: createdEmployee.manager,
					active: createdEmployee.active
				}
			});
		}).catch((error: any): Bluebird<CommandResponse<Employee>> => {
			if (createTransaction != null) {
				console.log(createTransaction);
				createTransaction.rollback();
			}

			return Bluebird.reject(<CommandResponse<Employee>>{
				status: (error.status || 500),
				message: (error.message || ErrorCodeLookup.EC1002)
			});
		});
};
