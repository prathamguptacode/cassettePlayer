import express, { Request, Response, } from "express"
import multerMusic from "@/middleware/multerMusic"
import music from "@/model/music"
import multerCover from "@/middleware/multerCover"
import fs from "fs/promises"

const router = express.Router()

router.post("/music", multerMusic.single("music"), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(404).json({ message: "file not found" })
  }
  const path = req.file.path;
  const title = req.headers.title;
  const singers = req.headers.singers;
  if (!title) {
    await fs.unlink(path)
    return res.status(400).json({ message: "title not found" })
  }
  if (typeof singers != "string") {
    await fs.unlink(path)
    return res.status(400).json({ message: "singers not found" })
  }
  const arrSingers = singers.split(", ")
  const newMusic = new music({ title, singers: arrSingers, path })
  await newMusic.save()
  res.status(201).json({ message: "uploaded successfully", musicId: newMusic.id })
})


router.post("/cover/:id", multerCover.fields([{ name: "mainCover" }, { name: "sideCover" }]), async (req: Request, res: Response) => {
  // @ts-ignore
  if (!req.files["mainCover"][0] || !req.files["sideCover"][0]) {
    return res.status(400).json({ message: "file not found" })
  }
  // @ts-ignore
  const mainCover = req.files["mainCover"][0].path
  // @ts-ignore
  const sideCover = req.files["sideCover"][0].path
  const musicId = req.params.id
  const dbRes = await music.updateOne({ _id: musicId }, { mainCover, sideCover })
  if (dbRes.modifiedCount > 0) {
    return res.json({ message: "cover uploaded", musicId })
  }
  return res.status(400).json({ message: "failed upload", musicId })
})

export default router

