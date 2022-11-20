const express = require("express"),
    router = express.Router(),
    mongoose = require('mongoose'),
    Project = mongoose.model("Project"),
    Colab = mongoose.model("Colab"),
    tokenVerifier = require("../middleware/token_verification");

router.get("/", tokenVerifier, async function (req, res) {
    try {
        const projects = await Project.find();
        return res.status(200).jsonp(projects);
    } catch (e) {
        return res.status(404).jsonp({"message": e.message})
    }
});

router.get("/:id", tokenVerifier, async function (req, res) {
    try {
        const project = await Project.findById(req.params.id);
        let colab;
        let status = "";
        let colabs;
        let is_owner = project.owner === req.tokenData.id;
        if (is_owner) {
            colabs = await Colab.find({"project": req.params.id})
            console.log(colabs)
        } else {
            colab = await Colab.findOne({"project": req.params.id, "creator_user": req.tokenData.id})
        }
        return res.status(200).jsonp({project, colab, colabs, is_owner});
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