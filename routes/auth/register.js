const express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router(),
    User = mongoose.model("User"),
    {generateAccessToken} = require("./token_generator");

router.post("/", async function (req, res) {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send("invalid username or password");
    }

    if (await User.exists({email: req.body.email}))
        return res.status(400).send({message: "Email already exists"});
    try {
        const user = await new User({
            ...req.body
        }).save();
        return res.status(201).send({
            accessToken: generateAccessToken(user),
        });
    }
    catch (e) {
        return res.status(400).send({
            message: "Parameters missing"
        });
    }


});

module.exports = router;
