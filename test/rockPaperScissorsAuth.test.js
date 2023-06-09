const authenticate = require("../lib/authenticate");
const { options, combinations } = require("../lib/helpers");

describe("rpsAuth", () => {
	it("should throw an error if 'rps' is missing from the request", () => {
		const mockRequest = {
			headers: {},
		};

		expect(() => {
			authenticate(jest.fn(), options, combinations)(
				mockRequest,
				jest.fn(),
				jest.fn()
			);
		}).toThrow("RPSAuth missing!");
	});

	it("should throw an error if the server wins the authentication round", () => {
		const mockPlayServerHand = jest.fn().mockImplementationOnce(() => "rock");
		const mockRequest = {
			headers: {
				authorization: "scissor",
			},
		};

		expect(() => {
			authenticate(mockPlayServerHand, options, combinations)(
				mockRequest,
				jest.fn(),
				jest.fn()
			);
		}).toThrow("Server: rock vs Client: scissor");
	});

	it("should throw error, if the result is a tie", () => {
		const mockPlayServerHand = jest.fn().mockImplementationOnce(() => "rock");
		const mockRequest = {
			headers: {
				authorization: "rock",
			},
		};
		expect(() => {
			authenticate(mockPlayServerHand, options, combinations)(
				mockRequest,
				jest.fn(),
				jest.fn()
			);
		}).toThrow("Server: rock vs Client: rock");
	});

	it("should throw an error, if 'rps' is not a valid option", () => {
		const mockRequest = {
			headers: {
				authorization: "spock",
			},
		};

		expect(() => {
			authenticate(jest.fn(), options, combinations)(
				mockRequest,
				jest.fn(),
				jest.fn()
			);
		}).toThrow("Unknown RPSAuth Hand: spock");
	});

	it("should call the next middleware if the Client wins the authentication round", () => {
		const mockPlayServerHand = jest.fn().mockImplementationOnce(() => "paper");
		const mockRequest = {
			headers: {
				authorization: "scissor",
			},
		};
		const mockNext = jest.fn();

		authenticate(mockPlayServerHand, options, combinations)(
			mockRequest,
			jest.fn(),
			mockNext
		);
		expect(mockNext).toHaveBeenCalledTimes(1);
	});
});
