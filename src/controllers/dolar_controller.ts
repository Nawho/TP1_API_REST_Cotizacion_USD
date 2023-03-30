import express from "express"
import { DolarModel } from "../models/Dolar"

//let dolares: Array<Dolar> = new Array<Dolar>
//dolares.push(new Dolar("Blue", 250, 7000, new Array<RegistroDiario>))

export default {
    get_all_dollars: async (req: express.Request, res: express.Response) => {
        const dolars = await DolarModel.find()

        res.status(200).json({
            data: dolars
        })
    },

    get_dollar: async (req: express.Request, res: express.Response) => {        
        const dolar_type = req.params.dolar_name
        if (!dolar_type) {
            return res.status(400).json({
                errors: "Error: Dollar name not specififed."
            })
        }

        const dolar = await DolarModel.findOne({ tipo: dolar_type })
        res.status(200).json({
            data: dolar
        })
    },

    post_dollar: async (req: express.Request, res: express.Response) => {        
        const data = req.body.nuevo_dolar
        const fields = ["tipo", "valor_compra", "valor_venta"]

        if (!data) {
            fields.forEach((field) => {
                if (!data[field]) return res.status(400).json({
                    errors: `Error: Field ${field} not specified.`
                })
            })
        }

        res.status(200).json({
            "Datos insertados": data
        })
    },
    patch_dollar: () => {},
    delete_dollar: () => {},
}
