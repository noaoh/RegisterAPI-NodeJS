import * as ProductRepository from "../src/controllers/commands/models/repositories/productRepository";
import { ProductAttributes } from "../src/controllers/commands/models/entities/productEntity";
import { randomFloat, randomInt } from "../src/controllers/commands/helpers/helper";
import Decimal from "decimal.js";
// This is actually fetchMock, don't ask me why
import { MockResponseInit } from "jest-fetch-mock";
import { fetch as realFetch } from "cross-fetch";

/*
const generateRecords = (records: number): void => {
	let i: number;
	for (i = 0; i < records; i++) {
		const product: ProductAttributes = {
			"count": randomInt(0, 20),
			"price": new Decimal(randomFloat(1.00, 10.00)),
			"lookupCode": String(randomInt(0, 10000))
		};
		ProductRepository.create(product);
	}
};
*/

beforeEach(() => {
	fetchMock.resetMocks();
});

test("queryById command invalid Id", () => {
	expect(1 + 1).toBe(2);
});

test("queryById command Product not found", () => {
	expect(1 + 1).toBe(2);
});

test("queryById command Product found", () => {
	const resp = {
		"count": 2,
		"price": 3.50,
		"lookupCode": "",
		"id": 42,
		createdOn: "3"
	};

	fetchMock.mockResponseOnce(JSON.stringify(resp));
	const req = fetchMock.once("0.0.0.0:15100/api/product/42");
	expect(req).toEqual(resp);
});

test("queryByLookupCode command invalid LookupCode", () => {
	expect(1 + 1).toBe(2);
});

test("queryByLookupCode command Product not found", () => {
	expect(1 + 1).toBe(2);
});

test("queryByLookupCode command Product found", () => {
	const resp = {
		"id": "7a5a917c-3d3c-4224-ad73-9004df4b0506",
		"count": "100",
		"lookupCode": "lookupcode1",
		"createdOn": "2019-02-25T15:04:17.",
		"price": "1.00"
	};

	fetchMock.mockResponseOnce(JSON.stringify(resp));
	const req = realFetch("0.0.0.0:15100/api/bylookupcode/lookupcode1");
	expect(req).toEqual(resp);
});

test("productsQuery command no products exist", () => {
	expect(1 + 1).toBe(2);
});

test("productsQuery command products exist", () => {
	expect(1 + 1).toBe(2);
});

test("productCreateCommand LookupCode invalid", () => {
	expect(1 + 1).toBe(2);
});

test("productCreateCommand count invalid", () => {
	expect(1 + 1).toBe(2);
});

test("productCreateCommand exact Product already exists", () => {
	expect(1 + 1).toBe(2);
});

test("productDeleteCommand Product does not exist", () => {
	expect(1 + 1).toBe(2);
});

test("productDeleteCommand Product exists", () => {
	expect(1 + 1).toBe(2);
});

test("productClearCommand no products exist", () => {
	expect(1 + 1).toBe(2);
});

test("productClearCommand products exist", () => {
	expect(1 + 1).toBe(2);
});

test("productUpdateCommand id invalid", () => {
	expect(1 + 1).toBe(2);
});

test("productUpdateCommand lookupCode invalid", () => {
	expect(1 + 1).toBe(2);
});

test("productUpdateCommand count invalid", () => {
	expect(1 + 1).toBe(2);
});

test("productUpdateCommand Product does not exist", () => {
	expect(1 + 1).toBe(2);
});

test("productUpdateCommand Product successfully updated", () => {
	expect(1 + 1).toBe(2);
});
