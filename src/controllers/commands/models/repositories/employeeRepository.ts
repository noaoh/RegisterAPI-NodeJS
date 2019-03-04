import Bluebird from "bluebird";
import Sequelize from "sequelize";
import { EmployeeFieldName } from "../constants/fieldNames/employeeFieldNames";
import { EmployeeAttributes, EmployeeEntity, EmployeeInstance } from "../entities/employeeEntity";

export let queryById = (id: string, queryTransaction?: Sequelize.Transaction): Bluebird<EmployeeInstance | null> => {
	return EmployeeEntity.findOne(<Sequelize.FindOptions<EmployeeAttributes>>{
		transaction: queryTransaction,
		where: <Sequelize.WhereOptions<EmployeeAttributes>>{ id: id }
	});
};

export let queryByEmployeeID = (employeeID: number, queryTransaction?: Sequelize.Transaction): Bluebird<EmployeeInstance | null> => {
	return EmployeeEntity.findOne(<Sequelize.FindOptions<EmployeeAttributes>>{
		transaction: queryTransaction,
		where: <Sequelize.WhereOptions<EmployeeAttributes>>{ employee_id: employeeID }
	});
};

export let queryAll = (): Bluebird<EmployeeInstance[]> => {
	return EmployeeEntity.findAll(<Sequelize.FindOptions<EmployeeAttributes>>{
		order: [ [EmployeeFieldName.CreatedOn, "ASC"] ]
	});
};

export let create = (newEmployee: EmployeeAttributes, createTransaction?: Sequelize.Transaction): Bluebird<EmployeeInstance> => {
	return EmployeeEntity.create(
		newEmployee,
		<Sequelize.CreateOptions>{
			transaction: createTransaction
		});
};

export let destroy = (employeeListEntry: EmployeeInstance, destroyTransaction?: Sequelize.Transaction): Bluebird<void> => {
	return employeeListEntry.destroy(<Sequelize.InstanceDestroyOptions>{
			transaction: destroyTransaction
		});
};

export let clear = (clearTransaction?: Sequelize.Transaction): Bluebird<number> => {
	return EmployeeEntity.destroy(<Sequelize.InstanceDestroyOptions>{
		where: {},
		force: true,
		transaction: clearTransaction
		});
};
