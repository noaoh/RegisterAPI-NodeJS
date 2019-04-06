export enum ParameterLookup {
	ProductId = "productId",
	ProductLookupCode = "productLookupCode",
	EmployeeId = "employeeUUID",
	EmployeeLookupCode = "employeeID"
}

export enum RouteLookup {
	// API routing
	API = "/api",
	Test = "/test",

	// Product
	Product = "/product",
	ByLookupCode = "/bylookupcode",

	// Employee
	Employee = "/employee",
	ByEmployeeID = "/byemployeeid",

	// Transaction
	Transaction = "/transaction",
	ByTransactionID = "/bytransactionid",
	ProductReport = "/productreport",

	// Parameters
	ProductIdParameter = "/:productId",
	ProductLookupCodeParameter = "/:productLookupCode",

	EmployeeIdParameter = "/:employeeUUID",
	EmployeeLookupCodeParameter = "/:employeeID",

	TransactionIDParameter = "/:transactionUUID"
	// End parameters
	// End product
	// End API routing
}

// Error codes
export enum ErrorCodeLookup {
	// Database
	// Database - product
	EC1001 = "Product was not found.",
	EC1002 = "Unable to save product.",
	EC1003 = "Unable to delete product.",
	// End database - product
	// Database - employee
	EC1201 = "Employee was not found.",
	EC1202 = "Unable to save employee.",
	EC1203 = "Unable to delete employee.",
	// End database - employee
	// End database

	// General
	// General - product
	EC2001 = "Unable to retrieve product listing.",
	EC2002 = "Unable to retrieve product details",
	EC2025 = "The provided product record ID is not valid.",
	EC2026 = "Please provide a valid product lookup code.",
	EC2027 = "Please provide a valid product count.",
	EC2028 = "Product count may not be negative.",
	EC2029 = "Conflict on parameter: lookupcode.",
	// End general - product
	// General - employee
	EC2201 = "Unable to retrieve employee listing.",
	EC2202 = "Unable to retrieve employee details",
	EC2203 = "Unable to sign in employee.",
	EC2225 = "The provided employee record ID is not valid",
	EC2226 = "Please provide a valid employee ID.",
	EC2227 = "Please provide a valid first name.",
	EC2228 = "Please provide a valid last name.",
	EC2229 = "Please provide a valid password.",
	EC2230 = "Please provide a valid cashier type.",
	EC2231 = "Please provide a valid manager ID.",
	EC2251 = "Sign in credentials are invalid",
	// End general - employee
	// General - transaction
	EC3001 = "Unable to retrieve product report."
	// End general

}

// End error codes
