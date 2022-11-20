const express = require("express"),
    projects = require("./projects"),
    router = express.Router();

router.use("/", projects);

module.exports = router;