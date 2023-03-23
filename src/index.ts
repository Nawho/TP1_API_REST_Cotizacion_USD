import express from "express";

const app: express.Application = express()
const port: number = 38406


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

app.get('/', (req, res) => {
    console.log('Connection on /')
    res.status(204).send()
})