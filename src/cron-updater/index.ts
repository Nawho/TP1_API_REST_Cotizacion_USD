import mongoose from "mongoose"
import { Page, launch } from 'puppeteer';
import { setTimeout } from "timers/promises";
import { DolarComprable, DolarComprableYVendible } from "../models/DolarScapeData";
import { DolarModel } from "../models/Dolar"

require("dotenv").config()

mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING!)

const DOLAR_OFICIAL_COMPRA = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[2]/div[4]/div[2]/div[1]/span[1]"
const DOLAR_OFICIAL_VENTA = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[2]/div[4]/div[2]/div[2]/span[1]"
const DOLAR_BLUE_COMPRA = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[2]/div[1]/div[2]/div[1]/span[1]"
const DOLAR_BLUE_VENTA = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[2]/div[1]/div[2]/div[2]/span[1]"
const DOLAR_BANCO_NACION_COMPRA = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[2]/div[6]/div[2]/div[1]/span[1]"
const DOLAR_BANCO_NACION_VENTA = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[2]/div[6]/div[2]/div[2]/span[1]"
const DOLAR_MAYORISTA_COMPRA = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[2]/div[5]/div[2]/div[1]/span[1]"
const DOLAR_MAYORISTA_VENTA = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[2]/div[5]/div[2]/div[2]/span[1]"
const DOLAR_FUTURO_COMPRA = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[1]/div[5]/div[2]/div[1]/span[1]"
const DOLAR_FUTURO_VENTA = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[1]/div[5]/div[2]/div[2]/span[1]"
const DOLAR_TURISTA = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[1]/div[1]/div[2]/div/span[1]"
const DOLAR_CCL = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[1]/div[2]/div[2]/div/span[1]"
const DOLAR_LUJO = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[1]/div[3]/div[2]/div/span[1]"
const DOLAR_COLDPLAY = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[2]/div[3]/div[2]/div/span[1]"
const DOLAR_MEP = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[1]/div[4]/div[2]/div/span[1]"
const DOLAR_AHORRO = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[1]/div[6]/div[2]/div/span[1]"
const DOLAR_QATAR = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[2]/div[2]/div[2]/div/span[1]"

const DOLAR_OFICIAL_UPDATED = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[2]/div[4]/div[2]/span"
const DOLAR_BLUE_UPDATED = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[2]/div[1]/div[2]/span"
const DOLAR_BANCO_NACION_UPDATED = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[2]/div[6]/div[2]/span"
const DOLAR_MAYORISTA_UPDATED = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[2]/div[5]/div[2]/span"
const DOLAR_FUTURO_UPDATED = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[1]/div[5]/div[2]/span"
const DOLAR_TURISTA_UPDATED = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[1]/div[1]/div[2]/span"
const DOLAR_CCL_UPDATED = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[1]/div[2]/div[2]/span"
const DOLAR_LUJO_UPDATED = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[1]/div[3]/div[2]/span"
const DOLAR_COLDPLAY_UPDATED = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[2]/div[2]/div[2]/span"
const DOLAR_MEP_UPDATED = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[1]/div[4]/div[2]/span"
const DOLAR_AHORRO_UPDATED = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[1]/div[6]/div[2]/span"
const DOLAR_QATAR_UPDATED = "/html/body/main/div/div[1]/div[1]/div/div[2]/div[2]/div[2]/div[2]/span"

const XPATH_TIMEOUT = 10000

const dolarData: { [key: string]: DolarComprableYVendible | DolarComprable } = {
    "Dólar Oficial": new DolarComprableYVendible("oficial", "Dólar Oficial", DOLAR_OFICIAL_UPDATED, DOLAR_OFICIAL_COMPRA, DOLAR_OFICIAL_VENTA),
    "Dólar Blue": new DolarComprableYVendible("blue", "Dólar Blue", DOLAR_BLUE_UPDATED, DOLAR_BLUE_COMPRA, DOLAR_BLUE_VENTA),
    "Dólar Banco Nación": new DolarComprableYVendible("bna", "Dólar Banco Nación", DOLAR_BANCO_NACION_UPDATED, DOLAR_BANCO_NACION_COMPRA, DOLAR_BANCO_NACION_VENTA),
    "Dólar Mayorista": new DolarComprableYVendible("mayorista", "Dólar Mayorista", DOLAR_MAYORISTA_UPDATED, DOLAR_MAYORISTA_COMPRA, DOLAR_MAYORISTA_VENTA),
    "Dólar Futuro": new DolarComprableYVendible("futuro", "Dólar Futuro", DOLAR_FUTURO_UPDATED, DOLAR_FUTURO_COMPRA, DOLAR_FUTURO_VENTA),
    "Dólar Turista": new DolarComprable("turista", "Dólar Turista", DOLAR_TURISTA_UPDATED, DOLAR_TURISTA),
    "Dólar Contado con Liquidación": new DolarComprable("ccl", "Dólar Contado con Liquidación", DOLAR_CCL_UPDATED, DOLAR_CCL),
    "Dólar Lujo": new DolarComprable("lujo", "Dólar Lujo", DOLAR_LUJO_UPDATED, DOLAR_LUJO),
    "Dólar Coldplay": new DolarComprable("coldplay", "Dólar Coldplay", DOLAR_COLDPLAY_UPDATED, DOLAR_COLDPLAY),
    "Dólar MEP": new DolarComprable("mep", "Dólar MEP", DOLAR_MEP_UPDATED, DOLAR_MEP),
    "Dólar Ahorro": new DolarComprable("ahorro", "Dólar Ahorro", DOLAR_AHORRO_UPDATED, DOLAR_AHORRO),
    "Dólar Qatar": new DolarComprable("qatar", "Dólar Qatar", DOLAR_QATAR_UPDATED, DOLAR_QATAR),
}

async function insertScrapedValue(page: Page, dollar: DolarComprable | DolarComprableYVendible, xPath: string, dollarKey: string, isPrice: boolean) {
    const handler = await page.waitForXPath(xPath, { timeout: XPATH_TIMEOUT })
    const value = await handler?.evaluate(e => e.textContent)
    if (value) {
        //@ts-ignore
        if (isPrice) dollar[dollarKey] = parseFloat(value.replace(",", "."))
        //@ts-ignore
        else dollar[dollarKey] = value
    }
}

async function scrapeDollar(page: Page, dollar: DolarComprable | DolarComprableYVendible) {
    await insertScrapedValue(page, dollar, dollar.xpathLastUpdated, "lastUpdated", false)
    if (dollar instanceof DolarComprableYVendible) await insertScrapedValue(page, dollar, dollar.xpathVenta, "venta", true)
    await insertScrapedValue(page, dollar, dollar.xpathCompra, "compra", true)
}


/* async function createDollarsInDB() {
    for (let dolar of Object.values(dolarData)) {
        console.log(`Inserting data: ${dolar.toString()}`)
        if (dolar.compra === -1 || dolar.lastUpdated === "") { console.log("Incomplete data"); continue }

        const dbData = {
            "tipo": dolar.fullName,
            "valor_compra": dolar.compra.toString(),
            "ult_acualizacion": dolar.lastUpdated,
            "db_ult_actualizacion": new Date().toISOString()
        }

        if (dolar instanceof DolarComprableYVendible) {
            if (dolar.venta === -1) { console.log("Incomplete data"); continue }
            //@ts-ignore
            dbData["valor_venta"] = dolar.venta.toString()
        }

        const newDollar = await DolarModel.create(dbData)
        await newDollar.save()
    }
} */

async function updateDollarsInDB() {
    for (let dolar of Object.values(dolarData)) {
        console.log(`Updating data: ${dolar.toString()}`)
        if (dolar.compra === -1 || dolar.lastUpdated === "") { console.log("Incomplete data"); continue }

        const dbData = {
            "nombre_completo": dolar.fullName,
            "valor_compra": dolar.compra.toString(),
            "ult_actualizacion": dolar.lastUpdated,
            "db_ult_actualizacion": new Date().toISOString().slice(0, 19).replace('T', ' ')
        }

        if (dolar instanceof DolarComprableYVendible) {
            if (dolar.venta === -1) { console.log("Incomplete data"); continue }
            //@ts-ignore
            dbData["valor_venta"] = dolar.venta.toString()
        }


        await DolarModel.updateOne({ tipo: dolar.tipo }, dbData)
    }
}

async function scrapePage() {
    const browser = await launch({
        headless: true,
        args: [
            `--no-sandbox`,
            `--disable-setuid-sandbox`
        ]
    });
    const page = await browser.newPage();

    await page.goto('https://www.ambito.com/contenidos/dolar.html', {
        waitUntil: "domcontentloaded",
    });

    await setTimeout(15000) //wait for dollar prices to load

    const promises: Promise<void>[] = []
    for (let dolar of Object.values(dolarData)) {
        promises.push(scrapeDollar(page, dolar))
    }

    await Promise.allSettled(promises)
    await updateDollarsInDB()
    process.exit(0)
}



scrapePage()
