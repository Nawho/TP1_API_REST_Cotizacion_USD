import express from "express"
import { DolarModel } from "../../models/Dolar"


export default {
    get_all_dollars: async (req: express.Request, res: express.Response) => {
        const dolars = await DolarModel.find()

        res.status(200).json({
            "Data": dolars
        })
    },

    get_dollar: async (req: express.Request, res: express.Response) => {
        const dollar_type = req.params.tipo
        if (!dollar_type) {
            return res.status(400).json({
                "Message": "Error: No se especificó el tipo de dolar."
            })
        }


        const dolar = await DolarModel.findOne({ tipo: dollar_type })
        res.status(200).json({
            "Data": dolar
        })
    },

    post_dollar: async (req: express.Request, res: express.Response) => {
        const new_dollar_data = req.body.nuevo_dolar
        const fields = ["tipo", "valor_compra", "valor_venta"]

        if (!new_dollar_data) {
            return res.status(400).json({
                "Message": "Error: No especificaron datos para los datos del nuevo dolar."
            })
        }

        fields.forEach((field) => {
            if (!new_dollar_data[field]) {
                return res.status(400).json({
                    "Message": `Error: Campo ${field} no especificado.`
                })
            }
        })

        const existingDolar = await DolarModel.findOne({ tipo: new_dollar_data.tipo })
        if (existingDolar) {
            return res.status(409).json({
                "Message": "Error: Ya existe este tipo de dolar."
            })
        }

        const new_dollar = await DolarModel.create(new_dollar_data)
        new_dollar.save()

        res.status(201).json({
            "Message": "Nuevo tipo de dolar creado correctamente."
        })
    },

    patch_dollar: async (req: express.Request, res: express.Response) => {
        const target = await DolarModel.findOne({ tipo: req.body.target })
        if (!target) {
            return res.status(404).send(`${req.body.target} no encontrado`)
        }

        delete req.body["target"]
        await DolarModel.updateOne({ _id: target._id }, { $set: req.body })

        res.status(200).send(req.body)
    },

    put_dollar: async (req: express.Request, res: express.Response) => {
        const target = await DolarModel.findOne({ tipo: req.body.target })
        if (!target) {
            return res.status(404).send(`${req.body.target} no encontrado`)
        }

        delete req.body["target"]
        await DolarModel.replaceOne({ _id: target._id }, req.body )

        res.status(200).send(req.body)
    },

    save_values: async (req: express.Request, res: express.Response) => {
        const target = await DolarModel.findOne({ tipo: req.params.tipo })
        if (!target) {
            return res.status(404).send(`${req.body.target} no encontrado`)
        }

        await DolarModel.updateOne({ _id: target._id }, {
            $push: {
                historico: {
                    fecha: new Date(),
                    valor_compra: target.valor_compra,
                    valor_venta: target.valor_venta
                }
            }
        })

        res.status(200).send(`Valor actual de ${req.params.tipo} guardado en el historial.`)
    },

    delete_dollar: async (req: express.Request, res: express.Response) => {
        const dollar_type = req.body.tipo_dolar
        if (!dollar_type) {
            return res.status(404).json({
                "Message": "Error: No se especificó el tipo de dolar."
            })
        }

        DolarModel.deleteOne({ tipo: dollar_type })
        res.status(200).json({
            "Message": "Tipo de dolar eliminado correctamente."
        })
    },

    promedio_dolares: async (req: express.Request, res: express.Response) => {
        const dolars = await DolarModel.find()
        let valor = 0

        dolars.forEach(source => {
            valor += source.valor_compra!
        })

        if(dolars.length == 0) { res.status(200).send(`${0}`) }

        res.status(200).send(`${(valor/dolars.length).toFixed(2)}`)
    }
}
