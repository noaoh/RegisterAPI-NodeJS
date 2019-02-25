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
			employee_id: <Sequelize.DefineAttributeColumnOptions>{
				field: EmployeeFieldName.EmployeeID,
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			active: <Sequelize.DefineAttributeColumnOptions>{
				field: EmployeeFieldName.Active,
				type: Sequelize.BIGINT,
				allowNull: TRUE
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
				type: Sequelize.TIME,
				allowNull: false
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
