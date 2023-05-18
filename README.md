# RPSAuth - Rock-Paper-Scissor Authentication

This project is an implentation of the RPSAuth protocol as an Express Middleware.
The RPSAuth is based on the Rock-Paper-Scissor game. The server can only fulfill the request of the Client, if the Client has a winning hand over the Server and wins the current authentication round.
To provide extra protection, in case of a tie, the Client still loses the round.

## Usage

```JavaScript
const express = require("express");
const rpsAuth = require("rpsAuth");

const app = express();

app.use(rpsAuth);

app.get("/", (req, res) => {
 // ...c'mon do something
})

```

Then the Client simply needs to set the chosen _hand_ in the `Authorization` header.
