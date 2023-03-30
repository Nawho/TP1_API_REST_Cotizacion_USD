import express from "express"
import mongoose from "mongoose"
import { dolar_router } from "./routes/dolar"
require("dotenv").config()

const app: express.Application = express()
const port: number = 38406

app.use(express.json())
app.use('/', dolar_router)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING!)
