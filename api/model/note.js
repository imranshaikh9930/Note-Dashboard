const mongoose = require("mongoose");


const noteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    content: String,
    createdAt: { type: Date, default: Date.now }
},{timestamps:true})

module.exports = mongoose.model("Note",noteSchema);