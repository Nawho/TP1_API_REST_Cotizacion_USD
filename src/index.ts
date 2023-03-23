import express from "express"
import {dolar_router} from "./routes/dolar"

const app: express.Application = express()
const port: number = 38406

app.use('/', dolar_router)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
