const playServerHand = () => {
	const handIndex = Math.floor(Math.random() * 3);
	return options[handIndex];
};

const options = ["rock", "paper", "scissor"];

const combinations = {
	rock: "scissor",
	paper: "rock",
	scissor: "paper",
};

module.exports = { playServerHand, options, combinations };
