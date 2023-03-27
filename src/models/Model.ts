import mongoose from "mongoose"
import { Dolar } from "./Dolar"

export const DollarSchema = new mongoose.Schema<Dolar>({
    get_valor_compra: Number,
    get_valor_venta: Number,
  }, { collection: 'dolares'})


export const DolarModel = mongoose.model<Dolar>('Dolar', DollarSchema)