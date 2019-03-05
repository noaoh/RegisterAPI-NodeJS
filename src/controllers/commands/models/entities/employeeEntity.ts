import Sequelize from "sequelize";
import { DatabaseConnection } from "../databaseConnection";
import { DatabaseTableName } from "../constants/databaseTableNames";
import { EmployeeFieldName } from "../constants/fieldNames/employeeFieldNames";

const modelName: string = "Employee";

export interface EmployeeAttributes {
	lastName: string;
	firstName: string;
	employeeid: number;
	classification: string;
	password: string;
	manager: string;
	active: boolean;
}

export interface EmployeeInstance extends Sequelize.Instance<EmployeeAttributes> {
	id: string;
	lastName: string;
	firstName: string;
	employeeid: number;
	classification: string;
	password: string;
	createdOn: Date;
	manager: string;
	active: boolean;
}



export let EmployeeEntity: Sequelize.Model<EmployeeInstance, EmployeeAttributes> =
	DatabaseConnection.define<EmployeeInstance, EmployeeAttributes>(
		modelName,
		<Sequelize.DefineModelAttributes<EmployeeAttributes>>{
			id: <Sequelize.DefineAttributeColumnOptions>{
				field: EmployeeFieldName.ID,
				type: Sequelize.UUID,
				autoIncrement: true,
				primaryKey: true
			},
			lastName: <Sequelize.DefineAttributeColumnOptions>{
				field: EmployeeFieldName.LastName,
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ""
			},
			firstName: <Sequelize.DefineAttributeColumnOptions>{
				field: EmployeeFieldName.FirstName,
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ""
			},
			employeeid: <Sequelize.DefineAttributeColumnOptions>{
				field: EmployeeFieldName.EmployeeID,
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			active: <Sequelize.DefineAttributeColumnOptions>{
				field: EmployeeFieldName.Active,
				type: Sequelize.BIGINT,
				allowNull: true
			},
			classification: <Sequelize.DefineAttributeColumnOptions>{
				field: EmployeeFieldName.Classification,
				type: Sequelize.STRING,
				allowNull: true
			},
			password: <Sequelize.DefineAttributeColumnOptions>{
				field: EmployeeFieldName.Password,
				type: Sequelize.STRING,
				allowNull: true
			},
			createdOn: <Sequelize.DefineAttributeColumnOptions>{
				field: EmployeeFieldName.CreatedOn,
				type: Sequelize.DATE,
				allowNull: true
			},
			manager: <Sequelize.DefineAttributeColumnOptions>{
				field: EmployeeFieldName.Manager,
				type: Sequelize.UUID,
				allowNull: true
			}
		},
		<Sequelize.DefineOptions<EmployeeInstance>>{
			timestamps: false,
			freezeTableName: true,
			tableName: DatabaseTableName.EMPLOYEE
		});
