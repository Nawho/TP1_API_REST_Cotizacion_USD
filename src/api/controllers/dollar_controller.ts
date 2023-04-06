import express from "express"
import { DolarModel } from "../../models/Dolar"


export default {
    get_all_dollars: async (req: express.Request, res: express.Response) => {
        const dolars = await DolarModel.find()

        const public_dolar_data = dolars.map((dollar) => {
            //@ts-ignore
            const { _id, __v, ...public_data } = dollar._doc
            return public_data
        })

        res.status(200).json({
            "Data": public_dolar_data
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

        if (!dolar) {
            return res.status(404).json({
                "Message": "Error: No se encontró el tipo de dolar."
            })
        }

        //@ts-ignore
        const { _id, __v, ...public_data } = dolar._doc

        res.status(200).json({
            "Data": public_data
        })
    },

    post_dollar: async (req: express.Request, res: express.Response) => {
        const new_dollar_data = req.body
        const fields = ["tipo", "valor_compra", "nombre_completo"]

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
        const saved_dollar = await new_dollar.save()

        //@ts-ignore
        const { __v, _id, ...response_dollar } = saved_dollar._doc;
        res.status(201).json({ "Dólar creado": response_dollar })
    },

    patch_dollar: async (req: express.Request, res: express.Response) => {
        const target = await DolarModel.findOne({ tipo: req.body.tipo })
        if (!target) {
            return res.status(404).json({ "Message": `${req.body.tipo} no encontrado` })
        }

        delete req.body["tipo"]
        const patched_dolar = await DolarModel.findOneAndUpdate({ _id: target._id }, req.body, { new: true })

        //@ts-ignore
        const { __v, _id, ...response_dollar } = patched_dolar._doc;
        res.status(200).json({ "Dólar acualizado": response_dollar })
    },

    put_dollar: async (req: express.Request, res: express.Response) => {
        const target = await DolarModel.findOne({ tipo: req.body.tipo })
        if (!target) {
            return res.status(404).json({ "Message": `${req.body.tipo} no encontrado` })
        }

        const put_dolar = await DolarModel.findOneAndReplace({ _id: target._id }, req.body, { new: true })
        //@ts-ignore
        const { __v, _id, ...response_dollar } = put_dolar._doc;
        res.status(200).json({ "Dólar acualizado": response_dollar })
    },

    delete_dollar: async (req: express.Request, res: express.Response) => {
        const dollar_type = req.body.tipo
        if (!dollar_type) {
            return res.status(400).json({
                "Message": "Error: No se especificó el tipo de dolar."
            })
        }

        const dollar = await DolarModel.findOne({ tipo: dollar_type })
        if (!dollar) {
            return res.status(404).json({
                "Message": `Error: No se encontró el dolar ${dollar_type}.`
            })
        }

        await DolarModel.findByIdAndRemove(dollar._id, {})
        res.status(200).json({
            "Message": `${dollar.nombre_completo} eliminado correctamente.`
        })
    },

    promedio_dolares: async (req: express.Request, res: express.Response) => {
        const dolars = await DolarModel.find()
        let valor = 0

        dolars.forEach(source => {
            valor += source.valor_compra!
        })

        if (dolars.length === 0) {
            return res.status(200).json({ "Message": "No se encontraron dólares para hacer el promedio." })
        }
        res.status(200).json({
            "Data": `${(valor / dolars.length).toFixed(2)}`
        })
    },

    save_to_historico: async (req: express.Request, res: express.Response) => {
        const tipo = req.body.tipo
        const target = await DolarModel.findOne({ tipo: req.body.tipo })
        if (!target) {
            return res.status(404).json({ "Message": `${req.body.tipo} no encontrado.` })
        }

        const dollar_data = req.body
        const fields = ["fecha", "valor_compra"]

        if (!dollar_data) {
            return res.status(400).json({
                "Message": "Error: No especificaron datos para guardar en el registro histórico del dolar."
            })
        }

        const missing_fields: string[] = []

        fields.forEach((field) => {
            if (!dollar_data[field]) {
                missing_fields.push(field)
            }
        })

        if (missing_fields.length > 0) {
            return res.status(400).json({
                "Message": `Error: Campo(s) ${missing_fields.join(", ")} no especificado(s).`
            })
        }

        delete req.body["tipo"]
        await DolarModel.updateOne({ _id: target._id }, {
            $push: {
                "historico": req.body
            }
        })

        res.status(200).json({ "Message": `Histórico del dólar ${tipo} actualizado exitosamente.` })
    },
}
