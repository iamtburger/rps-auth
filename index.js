const rpsAuth = require("./lib/authenticate");
const { options, combinations, playServerHand } = require("./lib/helpers");

const rockPaperScissorAuth = rpsAuth(playServerHand, options, combinations);

module.exports = rockPaperScissorAuth;
