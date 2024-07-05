import express from "express";
import connect from "./controllers/main.js"

const app = express()
const PORT = 8000

app.get("/", async (_, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.send(await connect())
})

app.listen(PORT,() => {
  console.log(`Serving on localhost PORT:${PORT}`)
})
