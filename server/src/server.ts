import "dotenv/config"
import env from "./config/env"
import express, { Request, Response } from "express"
import mongoose from "mongoose"
import upload from "./routes/upload"
import stream from "./routes/music"
import errHandler from "./middleware/errormiddleware"
import cors from "cors"

mongoose.connect(env.DB_URL).then(() => console.log("connected to DB")).catch(() => {
  console.log("DB Connection error")
  process.exit(1)
})

const app = express()

app.use(cors())
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "hello world! music loverr" })
})

app.use("/upload", upload)
app.use("/stream", stream)

app.use(errHandler)

const PORT = env.PORT
app.listen(PORT, () => console.log("server on", PORT))
