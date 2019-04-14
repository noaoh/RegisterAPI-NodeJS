import Bluebird from "bluebird";
import * as restify from "restify";
import * as ProductReport from "./commands/transactions/productReportCommand";
import { ParameterLookup, ErrorCodeLookup } from "./lookups/stringLookup";
import * as TransactionCreateCommand from "./commands/transactions/transactionCreateCommand";
import { CommandResponse, ProductReportResult, Transaction, TransactionSaveRequest } from "./typeDefinitions";

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

const saveTransaction = (
	req: restify.Request,
	res: restify.Response,
	next: restify.Next,
	performSave: (transactionSaveRequest: TransactionSaveRequest) => Bluebird<CommandResponse<Transaction>>): void => {
	performSave(req.body)
		.then((transactionSaveCommandResponse: CommandResponse<Transaction>) => {
			res.send(transactionSaveCommandResponse.status, transactionSaveCommandResponse.data);
			return next();
		}, (error: any) => {
			res.send((error.status || 500), (error.message || ErrorCodeLookup.EC3012));
			return next();
		});
};

export let createTransaction = (req: restify.Request, res: restify.Response, next: restify.Next) => {
	saveTransaction(req, res, next, TransactionCreateCommand.execute);
};
