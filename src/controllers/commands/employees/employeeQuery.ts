import Bluebird from "bluebird";
import * as Helper from "../helpers/helper";
import { ErrorCodeLookup } from "../../lookups/stringLookup";
import { CommandResponse, Employee } from "../../typeDefinitions";
import { EmployeeInstance } from "../models/entities/employeeEntity";
import * as EmployeeRepository from "../models/repositories/employeeRepository";

const mapEmployeeData = (queriedEmployee: EmployeeInstance): Employee => {
	return <Employee>{
		id: queriedEmployee.id,
		lastName: queriedEmployee.lastName,
		firstName: queriedEmployee.firstName,
		employee_id: queriedEmployee.employee_id,
		classification: queriedEmployee.classification,
		password: queriedEmployee.password,
		createdOn: Helper.formatDate(queriedEmployee.createdOn),
		manager: queriedEmployee.manager,
		active: queriedEmployee.active
	};
};

export let queryById = (recordId?: string): Bluebird<CommandResponse<Employee>> => {
	if (!recordId || (recordId.trim() === "")) {
		return Bluebird.reject(<CommandResponse<Employee>>{
			status: 422,
			message: ErrorCodeLookup.EC2025
		});
	}

	return EmployeeRepository.queryById(recordId)
		.then((existingEmployee: (EmployeeInstance | null)): Bluebird<CommandResponse<Employee>> => {
			if (!existingEmployee) {
				return Bluebird.reject(<CommandResponse<Employee>>{
					status: 404,
					message: ErrorCodeLookup.EC1001
				});
			}

			return Bluebird.resolve(<CommandResponse<Employee>>{
				status: 200,
				data: mapEmployeeData(existingEmployee)
			});
		});
};

export let queryByEmployeeID = (employeeID: string): Bluebird<CommandResponse<Employee>> => {
	const realEmployeeID = Number(employeeID);
	if (realEmployeeID < 0 || realEmployeeID == null || realEmployeeID == NaN) {
		return Bluebird.reject(<CommandResponse<Employee>>{
			status: 422,
			message: ErrorCodeLookup.EC2026
		});
	}

	return EmployeeRepository.queryByEmployeeID(realEmployeeID)
		.then((existingEmployee: (EmployeeInstance | null)): Bluebird<CommandResponse<Employee>> => {
			if (!existingEmployee) {
				return Bluebird.reject(<CommandResponse<Employee>>{
					status: 404,
					message: ErrorCodeLookup.EC1001
				});
			}

			return Bluebird.resolve(<CommandResponse<Employee>>{
				status: 200,
				data: mapEmployeeData(existingEmployee)
			});
		});
};
