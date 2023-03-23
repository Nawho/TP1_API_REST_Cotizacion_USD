export class Dolar {
    private tipo: string // Blue, bolsa, turista, etc...
    private valor_compra: number
    private valor_venta: number
    private historico: Array<JSON>

    constructor(tipo: string, valor_compra: number, valor_venta: number, historico: Array<JSON>){
        this.tipo = tipo
        this.valor_compra = valor_compra
        this.valor_venta = valor_venta
        this.historico = historico
    }

    public get_tipo(): string {
        return this.tipo
    }
    public set_tipo(tipo: string): void {
        this.tipo = tipo
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

    public get_historico(): Array<JSON> {
        return this.historico
    }
    public set_historico(historico: Array<JSON>): void {
        this.historico = historico
        return
    }
}