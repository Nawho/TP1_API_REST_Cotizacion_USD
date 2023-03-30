import express from "express"
import { Dolar } from "./../models/Dolar"
import { RegistroDiario } from "../models/RegistroDiario"
import { DolarModel } from "../models/Model"

//let dolares: Array<Dolar> = new Array<Dolar>
//dolares.push(new Dolar("Blue", 250, 7000, new Array<RegistroDiario>))

export default {
    get_all_dollars: async (req: express.Request, res: express.Response) => {
        const dolars = await DolarModel.find()
        res.status(200).send(dolars)
    },

    get_dollar: async (req: express.Request, res: express.Response) => {
        console.log(req.body)
        //const new_dolar = await DolarModel.create()
        res.status(204).send()
    },

    post_dollar: () => {},
    patch_dollar: () => {},
    put_dollar: () => {},
    delete_dollar: () => {},
}
