import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "covers")
  },
  filename: (req, file, cb) => {
    const name = new Date().toISOString() + file.originalname.replaceAll(/\s/g, '')
    cb(null, name)
  }
})

export default multer({
  storage,
  limits: { fileSize: 5 * (10 ** 6) },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true)
    } else {
      cb(new Error("Invalid type"))
    }
  }
})
