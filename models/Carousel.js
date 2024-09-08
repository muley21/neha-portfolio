const mongoose = require("mongoose")
const carouselSchema = new mongoose.Schema({
    hero: { type: [String] },
    carousel: { type: String },

}, { timestamps: true })

module.exports = mongoose.model("carousel", carouselSchema)