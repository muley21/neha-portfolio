const asyncHandler = require("express-async-handler")
const { checkEmpty } = require("../utils/checkEmpty")
const Technology = require("../models/Technology")
const Social = require("../models/Social")
const Carousel = require("../models/Carousel")
const upload = require("../utils/upload")
exports.addTechnology = asyncHandler(async (req, res) => {
    const { name, category } = req.body
    const { isError, error } = checkEmpty({ name, category })
    if (isError) {
        return res.status(400).json({ message: "All Feilds Require", error })
    }
    await Technology.create({ name, category })
    res.json({ message: "Technology Create Success" })
})
exports.getTechnology = asyncHandler(async (req, res) => {
    const result = await Technology.find()
    res.json({ message: "Technology get Success", result })
})
exports.updateTechnology = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Technology.findByIdAndUpdate(id, req.body)
    res.json({ message: "Technology update Success" })
})
exports.deleteTechnology = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Technology.findByIdAndDelete(id)
    res.json({ message: "Technology update Success" })
})

// addSocial
exports.addSocial = asyncHandler(async (req, res) => {
    const { name, link } = req.body
    const { isError, error } = checkEmpty({ name, link })
    if (isError) {
        return res.status(400).json({ message: "All Feilds Require", error })
    }
    await Social.create({ name, link })
    res.json({ message: "Social Create Success" })
})
// getSocial
exports.getSocial = asyncHandler(async (req, res) => {
    const result = await Social.find()
    res.json({ message: "Social get Success", result })
})
// updateSocial
exports.updateSocial = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Social.findByIdAndUpdate(id, req.body)
    res.json({ message: "Social update Success" })
})
// deleteSocial
exports.deleteSocial = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Social.findByIdAndDelete(id)
    res.json({ message: "Social update Success" })
})
// addCarousel
exports.addCarousel = asyncHandler(async (req, res) => {
    upload(req, res, async err => {


        const { hero, carousel } = req.body
        const { error, isError } = checkEmpty({ hero, carousel })
        if (isError) {
            return res.status(400).json({ message: "All Fields Required", error })
        }

        console.log(req.files)
        const images = []
        for (const item of req.files) {
            const { secure_url } = await cloudinary.uploader.upload(item.path)
            images.push(secure_url)
        }

        // modify this code to support cloudinary

        await Carousel.create({ hero, carousel })
        return res.json({ message: "Carousel Create Success" })
    })
})

// getCarousel
exports.getCarousel = asyncHandler(async (req, res) => {
    const result = await Carousel.find()
    res.json({ message: "Carousel get Success", result })
})

// updateCarousel

exports.updateCarousel = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Carousel.findByIdAndUpdate(id, req.body)
    res.json({ message: "Carousel update Success" })
})

// deleteCarousel
exports.deleteCarousel = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Carousel.findByIdAndDelete(id)
    res.json({ message: "Carousel update Success" })
})