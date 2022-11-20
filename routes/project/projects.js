const express = require("express"),
    router = express.Router(),
    mongoose = require('mongoose'),
    Project = mongoose.model("Project"),
    tokenVerifier = require("../middleware/token_verification");

router.get("/", tokenVerifier, async function (req, res) {
    try {
        const projects = await Project.find();
        return res.status(200).jsonp(projects);
    } catch (e) {
        return res.status(404).jsonp({"message": e.message})
    }
});


router.post("/", tokenVerifier, async function (req, res) {
    try {
        const project = await new Project({
            owner: req.tokenData.id,
            ...req.body.project
        }).save()
        return res.status(200).jsonp(project);
    } catch (e) {
        return res.status(404).jsonp({"message": e.message})
    }
});

module.exports = router;