const mongoose = require("mongoose")

const Schema = mongoose.Schema(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        date_created: {type: Date, required: true, default: Date.now()},
        owner: {type: String, ref: "User", required: true, index: true},
        major: {type: String, required: true},
    },
    {collection: "projects"}
);
Schema.index({name: "text", "title": "text", "description": "text"});
module.exports = mongoose.model("Project", Schema);