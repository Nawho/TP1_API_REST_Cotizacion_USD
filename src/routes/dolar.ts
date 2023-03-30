import express from "express"
import dolar_controller from "../controllers/dollar_controller"

export const dolar_router = express.Router()

dolar_router
    .get('/', dolar_controller.get_all_dollars)
    .post('/', dolar_controller.post_dollar)
    .patch('/', dolar_controller.patch_dollar)
    .delete('/', dolar_controller.delete_dollar)

    .get('/:dolar_name', dolar_controller.get_dollar)
    