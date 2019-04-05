import Bluebird from "bluebird";
import Sequelize from "sequelize";
import { TransactionFieldName } from "../constants/fieldNames/transactionFieldNames";
import { TransactionAttributes, TransactionEntity, TransactionInstance } from "../entities/transactionEntity";
import { DatabaseConnection } from "../databaseConnection";

export interface ProductReportResult {
	lookupCode: string;
	totalQuantity: number;
	totalCost: number;
}

// According to docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html#instance-method-query this method returns
// an array containing the results, and each result should be an array.  The type option passed to query prevents the
// metadata we don't need from being returned.
export let productReport = (): Bluebird<ProductReportResult[]> => {
	return DatabaseConnection.query(
		"SELECT product.lookupcode, SUM(transaction.quantity) AS totalquantity, SUM(transaction.totalcost) AS totalcost " +
		"from transaction, product where product.id = transaction.product" +
		" group by product.lookupcode order by SUM(transaction.totalcost) desc limit 10",
		{type: Sequelize.QueryTypes.SELECT})
		.then((results: Array<Array<any>>) => results.map<ProductReportResult>((result: Array<any>) => {
				return <ProductReportResult>{
					lookupCode: result[0],
					totalQuantity: result[1],
					totalCost: result[2]
				};
			}
		));
};
