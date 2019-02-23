import Bluebird from "bluebird";
import Sequelize from "sequelize";
import { CommandResponse } from "../../typeDefinitions";
import { ErrorCodeLookup } from "../../lookups/stringLookup";
import * as DatabaseConnection from "../models/databaseConnection";
import * as EmployeeRepository from "../models/repositories/employeeRepository";

export let execute = (): Bluebird<CommandResponse<void>> => {
	let clearTransaction: Sequelize.Transaction;

	return DatabaseConnection.startTransaction()
		.then((startedTransaction: Sequelize.Transaction): Bluebird<number | null> => {
			clearTransaction = startedTransaction;

			return EmployeeRepository.clear(clearTransaction);
		}).then((): Bluebird<CommandResponse<void>> => {
			clearTransaction.commit();
			return Bluebird.resolve(<CommandResponse<void>>{status: 204});
		}).catch((error: any): Bluebird<CommandResponse<void>> => {
			if (clearTransaction != null) {
				clearTransaction.rollback();
			}

			return Bluebird.reject(<CommandResponse<null>>{
				status: (error.status || 500),
				message: (error.message || ErrorCodeLookup.EC1003)
			});
		});
};
