import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "musics")
  },
  filename: (req, file, cb) => {
    const name = new Date().toISOString() + file.originalname.replaceAll(/\s/g, '')
    cb(null, name)
  }
})

export default multer({
  storage,
  limits: { fileSize: 200 * (10 ** 6) },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("audio/")) {
      cb(null, true)
    } else {
      cb(new Error("Invalid type"))
    }
  }
})
