import { SwaggerOptions } from "swagger-ui-express"

const swaggerJSDoc = require('swagger-jsdoc')


const swc: SwaggerOptions = {
    "swaggerDefinition":{
        "info":{
            "version": "1.0.0",
            "title": "Dolar Aghj    PI",
            "description": "API para conseguir los valores del dolar.",
            "servers": ["http://localhost:38406"],
        },
        "servers": [
            {
              url: "http://localhost:38406",
            },
        ],
    },
    "apis": ["./dolar.ts"],
    "paths": {
        "/leto": {
            "get": {
                
            }
        }
    }
}


export const swaggerDocs = swaggerJSDoc(swc)
