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

	// Parameters
	ProductIdParameter = "/:productId",
	ProductLookupCodeParameter = "/:productLookupCode",

	EmployeeIdParameter = "/:employeeUUID",
	EmployeeLookupCodeParameter = "/:employeeID"
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
	// End database

	// General
	// General - product
	EC2001 = "Unable to retrieve product listing.",
	EC2002 = "Unable to retrieve product details",
	EC2025 = "The provided product record ID is not valid.",
	EC2026 = "Please provide a valid product lookup code.",
	EC2027 = "Please provide a valid product count.",
	EC2028 = "Product count may not be negative.",
	EC2029 = "Conflict on parameter: lookupcode."
	// End general - product
	// End general
}
// End error codes
