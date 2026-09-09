import "dotenv/config"
import express, { Request, Response } from "express"
import fs from "fs"
const app = express()


app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "hello world! music loverr" })
})

app.get("/music/:musicid", (req: Request, res: Response) => {
  // const musicId = req.params.musicid
  // if (typeof musicId != "string") {
  //   return res.status(400).json({ message: "Something went wrong" })
  // }
  const range = req.headers.range
  if (typeof range != "string") {
    return res.status(400).json({ message: "Range not found" })
  }
  const musicPath = "sources/music2.mp3"
  const musicSize = fs.statSync(musicPath).size
  const start = Number(range.replace(/\D/g, ''));
  const chunk = 10 ** 6;
  const end = Math.min(start + chunk, musicSize - 1)
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



const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log("server on", PORT))
