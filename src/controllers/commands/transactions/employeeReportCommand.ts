import Bluebird from "bluebird";
import * as Helper from "../helpers/helper";
import { CommandResponse, EmployeeReportResult } from "../../typeDefinitions";
import * as TransactionRepository from "../models/repositories/transactionRepository";

export let execute = (): Bluebird<CommandResponse<Array<EmployeeReportResult>>> => {
	return TransactionRepository.employeeReport()
		.then((ranks: Array<any>): Bluebird<CommandResponse<Array<EmployeeReportResult>>> => {
			return Bluebird.resolve(<CommandResponse<Array<EmployeeReportResult>>>{
				status: 200,
				data: ranks
			});
		});
};
