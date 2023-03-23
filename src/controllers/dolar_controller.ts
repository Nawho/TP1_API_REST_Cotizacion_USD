import express from "express"
import { Dolar } from "./../models/Dolar"

let dolares: Array<Dolar> = new Array<Dolar>
dolares.push(new Dolar("Blue", 250, 7000, new Array<JSON>))

export const dolar_index = (req: express.Request, res: express.Response) => {
    res.send(dolares)
}