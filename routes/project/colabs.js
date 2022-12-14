const express = require("express"),
    router = express.Router(),
    mongoose = require('mongoose'),
    Project = mongoose.model("Project"),
    Colab = mongoose.model("Colab"),
    User = mongoose.model("User"),
    tokenVerifier = require("../middleware/token_verification");
const Api = require("../../client/discord_client");

router.get("/", tokenVerifier, async function (req, res) {
    try {
        const colabs = await Colab.find({project: req.projectId})
        return res.status(200).jsonp(colabs);
    } catch (e) {
        return res.status(404).jsonp({"message": e.message})
    }
});


router.post("/", tokenVerifier, async function (req, res) {
    try {
        const user = await User.findById(req.tokenData.id);
        const colab = await new Colab({
            creator_user: req.tokenData.id,
            creator_name: user.name,
            creator_university: user.university,
            project: req.projectId,
            ...req.body
        }).save()
        return res.status(200).jsonp(colab);
    } catch (e) {
        return res.status(404).jsonp({"message": e.message})
    }
});

router.put("/:id", tokenVerifier, async function (req, res) {
    try {
        const project = await Project.findOne({"_id": req.projectId, "owner": req.tokenData.id});
        if (project.matched) {
            throw new Error("project is already matched")
        }
        const colab = await Colab.findOne({"_id": req.params.id, "project": req.projectId});
        colab.status = "accept"
        await colab.save()
        project.matched = true;
        await project.save();
        const colabs = await Colab.find({"project": req.projectId})
        colabs.forEach(async function (rejected){
            if (rejected._id.toString() !== colab._id.toString()) {
                rejected.status = "reject"
                await rejected.save()
            }
        })

        // const discordData = await Api.init(project.title);
        project.discordLink = "https://discord.com/invite/UvtRNQGAER"
        await project.save();


        return res.status(200).jsonp({});
    } catch (e) {
        return res.status(404).jsonp({"message": e.message})
    }
});


router.delete("/:id", tokenVerifier, async function (req, res) {
    try {
        const project = await Project.findOne({"_id": req.projectId, "owner": req.tokenData.id});
        if (project.matched) {
            throw new Error("project is already matched")
        }
        const colab = await Colab.findOne({"_id": req.params.id, "project": req.projectId});
        colab.status = "reject"
        await colab.save()

        return res.status(200).jsonp({});
    } catch (e) {
        return res.status(404).jsonp({"message": e.message})
    }
});

module.exports = router;