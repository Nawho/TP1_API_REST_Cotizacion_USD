import express from "express"

const dolar_controller = require("../controllers/dolar_controller")

export const dolar_router: express.Router = express.Router()

dolar_router.get('/', dolar_controller.dolar_index)
