import Sequelize from "sequelize";
import { DatabaseConnection } from "../databaseConnection";
import { DatabaseTableName } from "../constants/databaseTableNames";
import { EmployeeFieldName } from "../constants/fieldNames/employeeFieldNames";

const modelName: string = "Employee";

export interface EmployeeAttributes {
	id: string;
	lastName: string;
	firstName: string;
	employee_id: number;
	classification: string;
	password: string;
	createdOn: Date;
	manager: string;
	active: bool;
}

export interface EmployeeInstance extends Sequelize.Instance<EmployeeAttributes> {
	id: string;
	lastName: string;
	firstName: string;
	employee_id: number;
	classification: string;
	password: string;
	createdOn: Date;
	manager: string;
	active: bool;
}

export let EmployeeEntity: Sequelize.Model<EmployeeInstance, EmployeeAttributes> =
	DatabaseConnection.define<EmployeeInstance, EmployeeAttributes>(
		modelName,
		<Sequelize.DefineModelAttributes<EmployeeAttributes>>{
			id: <Sequelize.DefineAttributeColumnOptions>{
				field: ProductFieldName.ID,
				type: Sequelize.UUID,
				autoIncrement: true,
				primaryKey: true
			},
			lookupCode: <Sequelize.DefineAttributeColumnOptions>{
				field: ProductFieldName.LookupCode,
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ""
			},
			count: <Sequelize.DefineAttributeColumnOptions>{
				field: ProductFieldName.Count,
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			createdOn: <Sequelize.DefineAttributeColumnOptions>{
				field: ProductFieldName.CreatedOn,
				type: Sequelize.DATE,
				allowNull: true
			}
		},
		<Sequelize.DefineOptions<ProductInstance>>{
			timestamps: false,
			freezeTableName: true,
			tableName: DatabaseTableName.PRODUCT
		});
