import express from "express"

import { dolar_index, dolar_add } from "../controllers/dolar_controller"

export const dolar_router: express.Router = express.Router()

dolar_router.get('/', dolar_index)
dolar_router.post('/', dolar_add)