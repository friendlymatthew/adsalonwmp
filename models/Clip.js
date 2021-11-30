const mongoose = require("mongoose");
const Schema= mongoose.Schema;

const ClipSchema = new Schema({
    videoSrc: String,
    market: String,
    station: String,
    title: String,
    snippet: String,
    coder: String,
    seek: String,
    dateSubmitted: String,
    start: Number,
    stop: Number,
})

module.exports = mongoose.models.Clip || mongoose.model("Clip", ClipSchema);