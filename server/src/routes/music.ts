import music from "@/model/music"
import express, { Request, Response } from "express"
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from "fs"

const router = express.Router()

router.get("/maincover/:id", async (req: Request, res: Response) => {
  const musicId = req.params.id
  const dbMusic = await music.findById(musicId).select("mainCover")
  if (!dbMusic || !dbMusic.mainCover) {
    return res.status(404).json({ message: "music cover not found" })
  }
  const pathDb = dbMusic.mainCover
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  res.sendFile(pathDb, { root: path.join(__dirname, "../../dist/") })
})

router.get("/sidecover/:id", async (req: Request, res: Response) => {
  const musicId = req.params.id
  const dbMusic = await music.findById(musicId).select("sideCover")
  if (!dbMusic || !dbMusic.sideCover) {
    return res.status(404).json({ message: "music cover not found" })
  }
  const pathDb = dbMusic.sideCover
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  res.sendFile(pathDb, { root: path.join(__dirname, "../../dist/") })
})
//
// router.get("/music/:musicid", async (req: Request, res: Response) => {
//   const musicId = req.params.musicid
//   const range = req.headers.range
//   if (typeof range != "string") {
//     return res.status(400).json({ message: "Range not found" })
//   }
//   const dbMusic = await music.findById(musicId).select("path")
//   if (!dbMusic) {
//     return res.status(404).json({ message: "music not found" })
//   }
//   const musicPath = dbMusic.path
//   const musicSize = fs.statSync(musicPath).size
//   const start = Number(range.replace(/\D/g, ''));
//   const chunk = 10 ** 6;
//   const end = Math.min(start + chunk, musicSize - 1)
//   const contentLength = end - start + 1;
//   const headers = {
//     'Content-Range': `bytes ${start}-${end}/${musicSize}`,
//     'Accept-Ranges': 'bytes',
//     'Content-Length': contentLength,
//     'Content-Type': 'audio/mpeg',
//   };
//   console.log(req.headers.range)
//   console.log(headers)
//   res.writeHead(206, headers)
//   const musicStream = fs.createReadStream(musicPath, { start, end })
//   return musicStream.pipe(res)
// })
//
//
//

router.get("/music/:musicid", async (req: Request, res: Response) => {
  const musicId = req.params.musicid
  const range = req.headers.range
  if (typeof range != "string") {
    return res.status(400).json({ message: "Range not found" })
  }
  const dbMusic = await music.findById(musicId).select("path")
  if (!dbMusic) {
    return res.status(404).json({ message: "music not found" })
  }
  const musicPath = dbMusic.path
  const musicSize = fs.statSync(musicPath).size
  if (range == "bytes=0-0") {
    const headers = {
      'Content-Range': `bytes 0-0/${musicSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': 1,
      'Content-Type': 'audio/mpeg',
    };
    res.writeHead(206, headers)
    const musicStream = fs.createReadStream(musicPath, { start: 0, end: 0 })
    return musicStream.pipe(res)
  }
  const start = Number(range.replace(/\D/g, ''));
  const end = musicSize - 1
  const contentLength = end - start + 1;
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${musicSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': 'audio/mpeg',
  };
  res.writeHead(206, headers)
  const musicStream = fs.createReadStream(musicPath, { start, end })
  return musicStream.pipe(res)
})


router.get("/list", async (req: Request, res: Response) => {
  const list = await music.find({ _id: { $exists: true } }).select("_id title singers")
  res.json({ list: list })
})






export default router
