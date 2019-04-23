import Bluebird from "bluebird";
import * as restify from "restify";
import * as ProductReport from "./commands/transactions/productReportCommand";
import * as EmployeeReport from "./commands/transactions/employeeReportCommand";
import { ParameterLookup, ErrorCodeLookup } from "./lookups/stringLookup";
import { CommandResponse, EmployeeReportResult, ProductReportResult } from "./typeDefinitions";

export let productReport = (req: restify.Request, res: restify.Response, next: restify.Next) => {
	ProductReport.execute()
		.then((productReportCommandResponse: CommandResponse<ProductReportResult[]>) => {
			res.send(
				productReportCommandResponse.status,
				productReportCommandResponse.data);
			return next();
		}, (error: any) => {
			res.send(
				(error.status || 500),
				(error.message || ErrorCodeLookup.EC3001)
			);
			return next();
		});
};

export let employeeReport = (req: restify.Request, res: restify.Response, next: restify.Next) => {
	EmployeeReport.execute()
		.then((employeeReportCommandResponse: CommandResponse<EmployeeReportResult[]>) => {
			res.send(
				employeeReportCommandResponse.status,
				employeeReportCommandResponse.data);
			return next();
		}, (error: any) => {
			res.send(
				(error.status || 500),
				(error.message || ErrorCodeLookup.EC3001)
			);
			return next();
		});
};
