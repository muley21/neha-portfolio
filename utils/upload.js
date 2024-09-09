const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const fn = Date.now() + path.extname(file.originalname)
        cb(null, fn)
    }
})

const upload = multer({ storage: storage }).single("hero")

module.exports = upload