import express from "express"
import mongoose from "mongoose"
import {dolar_router} from "./routes/dolar"
import {MONGO_DB_CONNECTION_STRING} from "../config"


const app: express.Application = express()
const port: number = 38406

mongoose.set("strictQuery", false)

app.use(express.json())
app.use('/', dolar_router)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})



async function main() {
    await mongoose.connect(MONGO_DB_CONNECTION_STRING)
}

main()