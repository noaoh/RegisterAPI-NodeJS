import Sequelize from "sequelize";
import { DatabaseConnection } from "../databaseConnection";
import { DatabaseTableName } from "../constants/databaseTableNames";
import { TransactionFieldName } from "../constants/fieldNames/transactionFieldNames";
import Decimal from "decimal.js";

const modelName: string = "Transaction";

export interface TransactionAttributes {
	id?: string;
	quantity?: number;
	createdOn?: Date;
	totalcost?: Decimal;
	product?: string;
	employee?: string;
}

export interface TransactionInstance extends Sequelize.Instance<TransactionAttributes> {
	id: string;
	quantity: number;
	createdOn: Date;
	totalcost: Decimal;
	product: string;
	employee: string;
}

export let TransactionEntity: Sequelize.Model<TransactionInstance, TransactionAttributes> =
	DatabaseConnection.define<TransactionInstance, TransactionAttributes>(
		modelName,
		<Sequelize.DefineModelAttributes<TransactionAttributes>>{
			id: <Sequelize.DefineAttributeColumnOptions>{
				field: TransactionFieldName.ID,
				type: Sequelize.UUID,
				primaryKey: true
			},
			quantity: <Sequelize.DefineAttributeColumnOptions>{
				field: TransactionFieldName.Quantity,
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 1
			},
			totalcost: <Sequelize.DefineAttributeColumnOptions>{
				field: TransactionFieldName.Totalcost,
				type: Sequelize.DECIMAL(12, 2),
				allowNull: false,
				defaultValue: 0.00
			},
			createdon: <Sequelize.DefineAttributeColumnOptions>{
				field: TransactionFieldName.Createdon,
				type: Sequelize.DATE,
				allowNull: false
			},
			product: <Sequelize.DefineAttributeColumnOptions>{
				field: TransactionFieldName.Product,
				type: Sequelize.UUID
			},
			employee: <Sequelize.DefineAttributeColumnOptions>{
				field: TransactionFieldName.Employee,
				type: Sequelize.UUID
			}
		},
		<Sequelize.DefineOptions<TransactionInstance>>{
			timestamps: false,
			freezeTableName: true,
			tableName: DatabaseTableName.TRANSACTION
		});

