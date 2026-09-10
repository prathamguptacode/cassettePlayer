import { z } from "zod"

const envSchema = z.object({
  PORT: z.string().default("8000"),
  DB_URL: z.string()
})


const val = envSchema.safeParse(process.env)

if (val.success === false) {
  console.error("ENV not valid")
  process.exit(1)
}

export default val.data

