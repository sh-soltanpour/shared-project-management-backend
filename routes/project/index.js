const express = require("express"),
    colabs = require("./colabs"),
    projects = require("./projects"),
    router = express.Router();

router.use("/:projectId/colabs/", function (req, res, next) {
    req.projectId = req.params.projectId
    next();
}, colabs);
router.use("/", projects);

module.exports = router;