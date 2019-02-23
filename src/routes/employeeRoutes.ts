import * as restify from "restify";
import { RouteLookup } from "../controllers/lookups/stringLookup";
import * as EmployeeRouteController from "../controllers/employeetRouteController";

function employeeRoute(server: restify.Server) {
	server.get({path: (RouteLookup.API + RouteLookup.Employee), version: "0.0.1"}, EmployeeRouteController.queryEmployees);

	server.get({
		path: (RouteLookup.API + RouteLookup.Employee + RouteLookup.EmployeeIdParameter),
		version: "0.0.1"
	}, EmployeeRouteController.queryEmployeeById);

	server.get({
		path: (RouteLookup.API + RouteLookup.Employee + RouteLookup.ByLookupCode + RouteLookup.EmployeeLookupCodeParameter),
		version: "0.0.1"
	}, EmployeeRouteController.queryEmployeeByLookupCode);

	server.post({
		path: (RouteLookup.API + RouteLookup.Employee),
		version: "0.0.1"
	}, EmployeeRouteController.createEmployee);

	server.put({
		path: (RouteLookup.API + RouteLookup.Employee + RouteLookup.EmployeeIdParameter),
		version: "0.0.1"
	}, EmployeeRouteController.updateEmployee);

	server.del({
		path: (RouteLookup.API + RouteLookup.Employee + RouteLookup.EmployeeIdParameter),
		version: "0.0.1"
	}, EmployeeRouteController.deleteEmployee);

	server.del({path: (RouteLookup.API + RouteLookup.Employee), version: "0.0.1"}, EmployeeRouteController.clearEmployees);

	server.get({
		path: (RouteLookup.API + RouteLookup.Test + RouteLookup.Employee),
		version: "0.0.1"
	}, (req: restify.Request, res: restify.Response, next: restify.Next) => {
		res.send(200, "Successful test. (Employee routing).");
		return next();
	});
}

module.exports.routes = EmployeeRoute;
