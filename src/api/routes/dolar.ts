import express from "express"
import dolar_controller from "../controllers/dollar_controller"

export const dolares_router = express.Router()

dolares_router.get('/', dolar_controller.get_all_dollars)
dolares_router.post('/', dolar_controller.post_dollar)
dolares_router.patch('/', dolar_controller.patch_dollar)
dolares_router.delete('/', dolar_controller.delete_dollar)
dolares_router.put('/', dolar_controller.put_dollar)
dolares_router.get('/promedio', dolar_controller.promedio_dolares)
dolares_router.post('/save_to_historico', dolar_controller.save_to_historico)
dolares_router.get('/:tipo', dolar_controller.get_dollar)


