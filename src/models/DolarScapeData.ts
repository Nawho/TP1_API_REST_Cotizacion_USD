export class DolarComprable {
    public fullName: string
    public xpathLastUpdated: string
    public xpathCompra: string
    public lastUpdated: string
    public compra: number

    constructor(dolarName: string, xpathLastUpdated: string, xpathCompra: string) {
        this.fullName = dolarName
        this.xpathCompra = xpathCompra
        this.xpathLastUpdated = xpathLastUpdated
        this.lastUpdated = ""
        this.compra = -1
    }

    toString() {
        return `El ${this.fullName} se puede comprar a $${this.compra} (Ult actualiz: ${this.lastUpdated})`
    }
}

export class DolarComprableYVendible extends DolarComprable {
    public xpathVenta: string
    public venta: number

    constructor(dolarName: string, xpathLastUpdated: string, xpathCompra: string, xpathVenta: string) {
        super(dolarName, xpathLastUpdated, xpathCompra)
        this.xpathVenta = xpathVenta
        this.venta = -1
    }

    toString() {
        return `El ${this.fullName} se puede comprar a $${this.compra} y vender a $${this.venta} (Ult actualiz: ${this.lastUpdated})`
    }
}

export interface DolarData { [key: string]: { value: DolarComprable | DolarComprableYVendible } }