import Bluebird from "bluebird";
import Sequelize from "sequelize";
import * as Helper from "../helpers/helper";
import { ErrorCodeLookup } from "../../lookups/stringLookup";
import * as DatabaseConnection from "../models/databaseConnection";
import * as TransactionRepository from "../models/repositories/transactionRepository";
import { CommandResponse, Transaction, TransactionSaveRequest } from "../../typeDefinitions";
import { TransactionInstance, TransactionAttributes } from "../models/entities/transactionEntity";

const validateSaveRequest = (saveTransactionRequest: TransactionSaveRequest): CommandResponse<Transaction> => {
	const validationResponse: CommandResponse<Transaction> = <CommandResponse<Transaction>>{status: 200};
	if ((saveTransactionRequest.quantity == null) || isNaN(saveTransactionRequest.quantity)) {
		validationResponse.status = 422;
		validationResponse.message = ErrorCodeLookup.EC3003;
	} else if (saveTransactionRequest.quantity < 0) {
		validationResponse.status = 422;
		validationResponse.message = ErrorCodeLookup.EC3004;
	} else if ((saveTransactionRequest.product == null) || (saveTransactionRequest.product.trim() == "")) {
		validationResponse.status = 422;
		validationResponse.message = ErrorCodeLookup.EC3005;
	} else if ((saveTransactionRequest.employee == null) || (saveTransactionRequest.employee.trim() == "")) {
		validationResponse.status = 422;
		validationResponse.message = ErrorCodeLookup.EC3006;
	} else if (saveTransactionRequest.totalcost == null) {
		validationResponse.status = 422;
		validationResponse.message = ErrorCodeLookup.EC3007;
	}

	return validationResponse;
};

export let execute = (saveTransactionRequest: TransactionSaveRequest): Bluebird<CommandResponse<Transaction>> => {
	const validationResponse: CommandResponse<Transaction> = validateSaveRequest(saveTransactionRequest);
	if (validationResponse.status !== 200) {
		return Bluebird.reject(validationResponse);
	}

	const transactionToCreate: TransactionAttributes = <TransactionAttributes>{
		createdOn: saveTransactionRequest.createdOn,
		totalcost: saveTransactionRequest.totalcost,
		employee: saveTransactionRequest.employee,
		product: saveTransactionRequest.product,
		quantity: saveTransactionRequest.quantity
	};

	let createTransaction: Sequelize.Transaction;

	return DatabaseConnection.startTransaction()
		.then((createdTransaction: Sequelize.Transaction): Bluebird<TransactionInstance> => {
			createTransaction = createdTransaction;
			return TransactionRepository.create(transactionToCreate, createTransaction);
		}).then((createdTransaction: TransactionInstance): Bluebird<CommandResponse<Transaction>> => {
			createTransaction.commit();
			return Bluebird.resolve(<CommandResponse<Transaction>>{
				status: 201,
				data: <Transaction>{
					id: createdTransaction.id,
					quantity: createdTransaction.quantity,
					totalcost: createdTransaction.totalcost,
					createdOn: createdTransaction.createdOn,
					product: createdTransaction.product,
					employee: createdTransaction.employee
				}
			});
		}).catch((error: any): Bluebird<CommandResponse<Transaction>> => {
			if (createTransaction !== null) {
				console.log(error);
				createTransaction.rollback();
			}

			return Bluebird.reject(<CommandResponse<Transaction>>{
				status: (error.status || 500),
				message: (error.message || ErrorCodeLookup.EC3012)
			});
		});
};
