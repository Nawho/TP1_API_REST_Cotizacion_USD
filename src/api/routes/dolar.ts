/**
*   @swagger
*   components:
*       schemas:
*           dolar:
*               type: object
*               properties: 
*                   id: 
*                       type: string
*                       description: leto
*/

import express from "express"
import dolar_controller from "../controllers/dollar_controller"

export const dolar_router = express.Router()

dolar_router.get('/', dolar_controller.get_all_dollars)
dolar_router.post('/', dolar_controller.post_dollar)
dolar_router.patch('/', dolar_controller.patch_dollar)
dolar_router.delete('/', dolar_controller.delete_dollar)
dolar_router.put('/', dolar_controller.put_dollar)

dolar_router.get('/promedio_dolares', dolar_controller.promedio_dolares)
dolar_router.get('/:tipo', dolar_controller.get_dollar)
dolar_router.patch('/:tipo/save_values', dolar_controller.save_values)
    