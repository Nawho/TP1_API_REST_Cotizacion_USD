import express from "express"
import { Dolar } from "./../models/Dolar"
import { RegistroDiario } from "../models/RegistroDiario"
import { DolarModel } from "../models/Model"
import mongoose from "mongoose"

let dolares: Array<Dolar> = new Array<Dolar>
dolares.push(new Dolar("Blue", 250, 7000, new Array<RegistroDiario>))

export const dolar_index = async (req: express.Request, res: express.Response) => {
    const dolars = await DolarModel.find()
    res.status(200).send(dolars)
}

export const dolar_add = async (req: express.Request, res: express.Response) => {
    console.log(req.body)
    //const new_dolar = await DolarModel.create()
    res.status(204).send()
}