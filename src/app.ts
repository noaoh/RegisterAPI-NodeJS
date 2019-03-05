import * as fs from "fs";
import dotenv from "dotenv";
import * as restify from "restify";
import corsMiddleware = require("restify-cors-middleware");

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

export let api = restify.createServer({
	version: "0.0.1",
	name: "register-api"
});

const cors = corsMiddleware({
	preflightMaxAge: 5,
	origins: ["https://pos-test-indv-dev.herokuapp.com/"],
	allowHeaders: ["API-Token, Origin, Content-Type, X-Auth-Token"],
	exposeHeaders: []
});

api.pre(cors.preflight);
api.use(cors.actual);

api.pre(restify.pre.sanitizePath());
api.use(restify.plugins.acceptParser(api.acceptable));
api.use(restify.plugins.bodyParser());
api.use(restify.plugins.queryParser());
api.use(restify.plugins.authorizationParser());
api.use(restify.plugins.fullResponse());

fs.readdirSync(__dirname + "/routes").forEach(function (routeConfig: string) {
	if (routeConfig.substr(-3) === ".js") {
		require(__dirname + "/routes/" + routeConfig)
			.routes(api);
	}
});

export default api;
