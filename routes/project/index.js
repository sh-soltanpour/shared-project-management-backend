const express = require("express"),
    projects = require("./projects");

router.use("/", projects);

module.exports = router;