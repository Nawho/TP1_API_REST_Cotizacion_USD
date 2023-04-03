import express from "express"
import mongoose from "mongoose"

import swaggerUiEexpress from 'swagger-ui-express'
import { dolar_router } from "./routes/dolar"
import { swaggerDocs } from "./routes/api_docs"

require("dotenv").config()

const app: express.Application = express()
const port: number = 38406

app
.use(express.json())
    .use('/api_docs', swaggerUiEexpress.serve, swaggerUiEexpress.setup(swaggerDocs))
    .use('/', dolar_router)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING!)