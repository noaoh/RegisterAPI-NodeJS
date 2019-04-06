import Bluebird from "bluebird";
import * as Helper from "../helpers/helper";
import { CommandResponse, ProductReportResult } from "../../typeDefinitions";
import * as TransactionRepository from "../models/repositories/transactionRepository";

export let execute = (): Bluebird<CommandResponse<Array<ProductReportResult>>> => {
	return TransactionRepository.productReport()
		.then((ranks: Array<any>): Bluebird<CommandResponse<Array<ProductReportResult>>> => {
			return Bluebird.resolve(<CommandResponse<Array<ProductReportResult>>>{
				status: 200,
				data: ranks/* .map<ProductReportResult>((rank: any) => {
						return <ProductReportResult>{
							lookupCode: rank.lookupCode,
							totalCost: rank.totalCost,
							totalQuantity: rank.totalQuantity
						};
						*/
					}
				);
			});
};
/*
};
*/
