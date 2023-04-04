import express from "express"
import mongoose from "mongoose"
import { dolar_router } from "./routes/dolar"
import swaggerUi from 'swagger-ui-express'
import { swaggerDoc as swaggerDocument } from './swagger'

require("dotenv").config()

const app: express.Application = express()
const port: number = 38406

app
    .use(express.json())
    .use('/api_docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use('/', dolar_router)
    .listen(port, () => {
        console.log(`API on http://localhost:${port}/`)
        console.log(`Documentation on http://localhost:${port}/api_docs`)
    })

mongoose
    .set("strictQuery", false)
    .connect(process.env.MONGO_DB_CONNECTION_STRING!)
