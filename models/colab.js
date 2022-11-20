const mongoose = require("mongoose")

const Schema = mongoose.Schema(
    {
        creator_user: {type: String, ref: "User", required: true},
        project: {type: String, ref: "Project", required: true},
        date_created: {type: Date, required: true, default: Date.now()},
        status: {type: String, "enum": ["pending", "reject", "accept"], default: "pending"},
    },
    {collection: "colabs"}
);
module.exports = mongoose.model("Colab", Schema);