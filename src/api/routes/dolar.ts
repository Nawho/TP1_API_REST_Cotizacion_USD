import express from "express"
import dolar_controller from "../controllers/dollar_controller"

export const dolar_router = express.Router()

dolar_router
    .get('/', dolar_controller.get_all_dollars)
    .post('/', dolar_controller.post_dollar)
    .patch('/', dolar_controller.patch_dollar)
    .delete('/', dolar_controller.delete_dollar)
    .put('/', dolar_controller.put_dollar)

    .get('/promedio_dolares', dolar_controller.promedio_dolares)
    .get('/:dolar_name', dolar_controller.get_dollar)
    .patch('/:dolar_name/save_values', dolar_controller.save_values)
    