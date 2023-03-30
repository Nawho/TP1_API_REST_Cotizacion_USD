import express from "express"
import dolar_controller from "../controllers/dolar_controller"

export const dolar_router: express.Router = express.Router()

dolar_router.get('/', dolar_controller.get_all_dollars)
dolar_router.post('/', dolar_controller.post_dollar)
dolar_router.patch('/', dolar_controller.patch_dollar)
dolar_router.delete('/', dolar_controller.delete_dollar)

dolar_router.get('/:dolar_name', dolar_controller.get_dollar)
