export class RegistroDiario {
    private fecha: Date
    private valor_compra: number
    private valor_venta: number

    constructor(fecha: Date, valor_compra: number, valor_venta: number) {
        this.fecha = fecha
        this.valor_compra = valor_compra
        this.valor_venta = valor_venta
    }

    public get_fecha(): Date {
        return this.fecha
    }
    public set_fecha(fecha: Date): void {
        this.fecha = fecha
        return
    }

    public get_valor_compra(): number {
        return this.valor_compra
    }
    public set_valor_compra(valor_compra: number): void {
        this.valor_compra = valor_compra
        return
    }

    public get_valor_venta(): number {
        return this.valor_venta
    }
    public set_valor_venta(valor_venta: number): void {
        this.valor_venta = valor_venta
        return
    }
}