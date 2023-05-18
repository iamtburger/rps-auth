const authenticate =
	(playServerHand, options, combinations) => (req, _res, next) => {
		const rps = req.headers?.authorization;

		if (!rps) {
			throw new Error("RPSAuth missing!");
		}

		const clientHand = rps.toLowerCase();

		if (!options.includes(clientHand)) {
			throw new Error(`Unknown RPSAuth Hand: ${clientHand}`);
		}

		const serverHand = playServerHand();
		const isTie = serverHand === clientHand;

		if (combinations[serverHand] === clientHand || isTie) {
			throw new Error(`Server: ${serverHand} vs Client: ${clientHand}`);
		}
		return next();
	};

module.exports = authenticate;
