import Bluebird from "bluebird";
import * as restify from "restify";
import * as EmployeesQuery from "./commands/employees/employeeQuery";
import * as EmployeesQuery from "./commands/employees/employeesQuery";
import { ParameterLookup, ErrorCodeLookup } from "./lookups/stringLookup";
import * as EmployeeCreateCommand from "./commands/employees/employeeCreateCommand";
import * as EmployeeDeleteCommand from "./commands/employees/employeeDeleteCommand";
import * as EmployeeUpdateCommand from "./commands/employees/employeeUpdateCommand";
import * as EmployeeClearCommand from "./commands/employees/employeeClearCommand";
import { CommandResponse, Employee, EmployeeSaveRequest } from "./typeDefinitions";

export let queryEmployees = (req: restify.Request, res: restify.Response, next: restify.Next) => {
	EmployeesQuery.query()
		.then((employeesQueryCommandResponse: CommandResponse<Employee[]>) => {
			res.send(
				employeesQueryCommandResponse.status,
				employeesQueryCommandResponse.data);

			return next();
		}, (error: any) => {
			res.send(
				(error.status || 500),
				(error.message || ErrorCodeLookup.EC2001));

			return next();
		});
};

export let queryEmployeeById = (req: restify.Request, res: restify.Response, next: restify.Next) => {
	EmployeeQuery.queryById(req.params[ParameterLookup.EmployeeId])
		.then((employeeQueryCommandResponse: CommandResponse<Employee>) => {
			res.send(
				employeeQueryCommandResponse.status,
				employeeQueryCommandResponse.data);

			return next();
		}, (error: any) => {
			res.send(
				(error.status || 500),
				(error.message || ErrorCodeLookup.EC2002));

			return next();
		});
};

export let queryEmployeeByLookupCode = (req: restify.Request, res: restify.Response, next: restify.Next) => {
	EmployeeQuery.queryByLookupCode(req.params[ParameterLookup.EmployeeLookupCode])
		.then((employeeQueryCommandResponse: CommandResponse<Employee>) => {
			res.send(
				employeeQueryCommandResponse.status,
				employeeQueryCommandResponse.data);

			return next();
		}, (error: any) => {
			res.send(
				(error.status || 500),
				(error.message || ErrorCodeLookup.EC2002));

			return next();
		});
};

const saveEmployee = (
	req: restify.Request,
	res: restify.Response,
	next: restify.Next,
	performSave: (employeeSaveRequest: EmployeeSaveRequest) => Bluebird<CommandResponse<Employee>>): void => {

	performSave(req.body)
		.then((employeeSaveCommandResponse: CommandResponse<Employee>) => {
			res.send(
				employeeSaveCommandResponse.status,
				employeeSaveCommandResponse.data);

			return next();
		}, (error: any) => {
			res.send(
				(error.status || 500),
				(error.message || ErrorCodeLookup.EC1002));

			return next();
		});
};

export let createEmployee = (req: restify.Request, res: restify.Response, next: restify.Next) => {
	saveEmployee(req, res, next, EmployeeCreateCommand.execute);
};

export let updateEmployee = (req: restify.Request, res: restify.Response, next: restify.Next) => {
	saveEmployee(req, res, next, EmployeeUpdateCommand.execute);
};

export let deleteEmployee = (req: restify.Request, res: restify.Response, next: restify.Next) => {
	EmployeeDeleteCommand.execute(req.params[ParameterLookup.EmployeeId])
		.then((employeeDeleteCommandResponse: CommandResponse<void>) => {
			res.send(employeeDeleteCommandResponse.status);

			return next();
		}, (error: any) => {
			res.send(
				(error.status || 500),
				(error.message || ErrorCodeLookup.EC1003));

			return next();
		});
};

export let clearEmployees = (req: restify.Request, res: restify.Response, next: restify.Next) => {
	EmployeeClearCommand.execute()
		.then((employeeClearCommandResponse: CommandResponse<void>) => {
			res.send(employeeClearCommandResponse.status);

			return next();
		}, (error: any) => {
			res.send(
				(error.status || 500),
				(error.message || ErrorCodeLookup.EC1003));
			return next();
		});
};
