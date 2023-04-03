import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose"
import { RegistroDiario } from "./RegistroDiario"

@modelOptions({
    schemaOptions: { collection: 'dolares' },
})
class Dolar {
    @prop({ required: true })
    tipo!: string // Blue, bolsa, turista, etc...

    @prop()
    nombre_completo!: string

    @prop()
    valor_compra?: number

    @prop()
    valor_venta?: number

    @prop()
    ult_actualizacion?: string

    @prop()
    db_ult_actualizacion!: string

    @prop()
    historico?: RegistroDiario[]
}

export const DolarModel = getModelForClass(Dolar);


