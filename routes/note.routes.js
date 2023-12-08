const express = require("express");
const { authenticator } = require("../middlewares/authenticator");

const noteRouter = express.Router()
noteRouter.use(authenticator)


module.exports = {
    noteRouter,
}