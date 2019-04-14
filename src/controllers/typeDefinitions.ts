import Decimal from "decimal.js";

// Request object definitions
export interface ProductSaveRequest {
	id?: string;
	count: number;
	lookupCode: string;
}

// End request object definitions

// Response object definitions
// Response data object definitions
export interface Product {
	id: string;
	count: number;
	createdOn: string;
	lookupCode: string;
}

export interface ProductReportResult {
	lookupCode: string;
	totalQuantity: number;
	totalCost: number;
}

// End response data object definitions

// API response data
export interface ApiResponse {
	errorMessage?: string;
}

export interface ProductSaveResponse extends ApiResponse {
	product: Product;
}

// End API response data
// End response object definitions

export interface CommandResponse<T> {
	data?: T;
	status: number;
	message?: string;
}

// Employee typeDefinitions
export interface EmployeeSaveRequest {
	id?: string;
	lastName: string;
	firstName: string;
	employeeid: number;
	classification: string;
	password: string;
	createdOn?: string;
	manager?: string;
	active: boolean;
}

export interface Employee {
	id: string;
	lastName: string;
	firstName: string;
	employeeid: number;
	classification: string;
	password: string;
	createdOn: string;
	manager: string;
	active: boolean;
}

export interface EmployeeSaveResponse extends ApiResponse {
	employee: Employee;
}

export interface TransactionSaveRequest {
	id?: string;
	quantity: number;
	createdOn: Date;
	totalcost: Decimal;
	product: string;
	employee: string;
}

export interface Transaction {
	id: string;
	quantity: number;
	createdOn: Date;
	totalcost: Decimal;
	product: string;
	employee: string;
}
