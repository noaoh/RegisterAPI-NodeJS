import * as restify from "restify";
import { RouteLookup } from "../controllers/lookups/stringLookup";
import * as TransactionRouteController from "../controllers/transactionRouteController";

function transactionRoute(server: restify.Server) {
	server.get({path: (RouteLookup.API + RouteLookup.Transaction + RouteLookup.ProductReport), version: "0.0.1"},
		TransactionRouteController.productReport);
}

module.exports.routes = transactionRoute;