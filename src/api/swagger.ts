const dolar = {
    "type": "object",
    "properties": {
        "tipo": {
            "type": "string"
        },
        "nombre_completo": {
            "type": "integer"
        },
        "valor_compra": {
            "type": "integer"
        },
        "valor_venta": {
            "type": "string"
        },
        "ult_actualizacion": {
            "type": "string"
        },
        "db_ult_actualizacion": {
            "type": "string"
        },
        "historico": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "fecha": {
                        "type": "string"
                    },
                    "valor_compra": {
                        "type": "string"
                    },
                    "valor_venta": {
                        "type": "string"
                    }
                }
            }
        }
    }
}

const dolar_list = {
    "type": "array",
    "items": dolar
}

const strict_req_body = {
    required: true,
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    tipo: {
                        type: 'string',
                        description: 'El tipo de dólar (sin tildes, espacios ni mayúsuclas) (blue, oficial, turista, etc)',
                        example: 'leto',
                    },
                    nombre_completo: {
                        type: 'string',
                        description: 'El nombre completo del dólar',
                        example: 'Dólar Leto',
                    },
                    valor_compra: {
                        type: 'number',
                        description: 'El valor de compra del nuevo dólar',
                        example: 230.50,
                    },
                    valor_venta: {
                        type: 'number',
                        description: 'El valor de venta del nuevo dólar',
                        example: 220,
                    },
                    ult_actualización: {
                        type: 'string',
                        description: 'La última vez que se actualizó esta información.',
                        example: "23/07/2022 - 12:30:01",
                    },
                },
                required: ['tipo', 'valor_compra', 'nombre_completo'],
            },
        },
    },
}

const save_to_historico_body = {
    required: true,
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    tipo: {
                        type: 'string',
                        description: 'El tipo de dólar (sin tildes, espacios ni mayúsuclas) (blue, oficial, turista, etc)',
                        example: 'leto',
                    },
                    fecha: {
                        type: 'string',
                        description: 'La fecha de los valores de compra y venta',
                        example: '13/07/2023',
                    },
                    valor_compra: {
                        type: 'number',
                        description: 'El valor de compra del dólar en esa fecha.',
                        example: 230.50,
                    },
                    valor_venta: {
                        type: 'number',
                        description: 'El valor de venta del dólar en esa fecha.',
                        example: 220,
                    },

                },
                required: ['tipo', 'valor_compra', 'fecha']
            }
        }
    }
}


const strict_req_params = [
    {
        name: 'tipo',
        in: 'body',
        required: true,
        schema: { type: 'string' },
    },
    {
        name: 'nombre_completo',
        in: 'body',
        required: true,
        schema: { type: 'string' },
    },
    {
        name: 'valor_compra',
        in: 'body',
        required: true,
        schema: { type: 'string' },
    },
    {
        name: 'valor_venta',
        in: 'body',
        schema: { type: 'string' },
    },
    {
        name: 'ult_actualizacion',
        in: 'body',
        schema: { type: 'string' },
    }
]

const optional_req_body = strict_req_body
optional_req_body.content["application/json"].schema.required = []

const optional_req_params = [
    {
        name: 'tipo',
        in: 'body',
        required: true,
        schema: { type: 'string' },
    },
    {
        name: 'nombre_completo',
        in: 'body',
        schema: { type: 'string' },
    },
    {
        name: 'valor_compra',
        in: 'body',
        schema: { type: 'string' },
    },
    {
        name: 'valor_venta',
        in: 'body',
        schema: { type: 'string' }
    }
]

const save_to_historico_req_params = [
    {
        name: 'tipo',
        in: 'body',
        required: true,
        schema: { type: 'string' },
    },
    {
        name: 'fecha',
        in: 'body',
        required: true,
        schema: { type: 'string' },
    },
    {
        name: 'valor_compra',
        in: 'body',
        schema: { type: 'string' },
        required: true
    },
    {
        name: 'valor_venta',
        in: 'body',
        schema: { type: 'string' }
    }
]




export const swaggerDoc = {
    "openapi": "3.0.0",
    "info": {
        "version": "1.0.0",
        "title": "Dólares Argentinos API.",
        "description": "API para obtener la cotización de los distintos tipos de dólares."
    },
    "servers": [
        {
            "url": "http://localhost:38406"
        }
    ],
    "paths": {
        "/dolares": {
            "get": {
                "tags": ["/dolares"],
                "summary": "Muestra todas las cotizaciones del dólar en Argentina.",
                "description": "Muestra el valor de compra y venta sobre 12 tipos de dólares en Argentina.",
                "responses": {
                    "200": {
                        "description": "Operación exitosa",
                        "content": {
                            "application/json": {
                                "schema": dolar_list
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": ["/dolares"],
                "summary": "Inserta un nuevo tipo de dólar.",
                "description": "Inserta un nuevo tipo de dólar en la base de datos, en caso de haber especificado todos los datos requeridos para ello en el request.",
                "requestBody": strict_req_body,
                "parameters": strict_req_params,
                "responses": {
                    "201": {
                        "description": "Nuevo tipo de dolar creado correctamente."
                    }
                }
            },
            "put": {
                "tags": ["/dolares"],
                "summary": "Sobreescribe un tipo de dólar.",
                "description": "Sobreescribe los datos de un tipo de dólar en la base de datos.",
                "requestBody": strict_req_body,
                "parameters": strict_req_params,
                "responses": {
                    "404": {
                        "description": "Dolar no encontrado"
                    },
                    "200": {
                        "description": "Operación exitosa",
                        "content": {
                            "application/json": {
                                "schema": dolar
                            }
                        }
                    }
                }
            },
            "patch": {
                "tags": ["/dolares"],
                "summary": "Actualiza campos de un tipo de dólar.",
                "description": "Actualiza los campos ingresados de un tipo de dólar en la base de datos.",
                "requestBody": optional_req_body,
                "parameters": optional_req_params,
                "responses": {
                    "404": {
                        "description": "Dolar no encontrado"
                    },
                    "200": {
                        "description": "Operación exitosa",
                        "content": {
                            "application/json": {
                                "schema": dolar
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": ["/dolares"],
                "summary": "Eliminar un tipo de dólar.",
                "description": "Eliminar un tipo de dólar en la base de datos.",
                "requestBody": {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    tipo: {
                                        type: 'string',
                                        description: 'El tipo de dólar (sin tildes, espacios ni mayúsuclas) (blue, oficial, turista, etc)',
                                        example: 'leto',
                                    }
                                },
                                required: ['tipo'],
                            },
                        },
                    },
                },
                "parameters": [
                    {
                        name: 'tipo',
                        in: 'body',
                        required: true,
                        schema: { type: 'string' },
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Dolar no encontrado."
                    },
                    "200": {
                        "description": "Operación exitosa",
                        "content": {
                            "application/json": {
                                "schema": dolar
                            }
                        }
                    }
                }
            }
        },

        "/dolares/{tipo}": {
            "get": {
                "tags": ["/dolares/{tipo}"],
                "summary": "Devuelve los datos del dolar.",
                "description": "Muestra los valores del dólar especificado por su tipo.",
                "parameters": [
                    {
                        "name": "tipo",
                        "in": "path",
                        "required": true,
                        "description": "Tipo del dolar",
                        "schema": { "type": "string" }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Dolar no encontrado."
                    },
                    "200": {
                        "description": "Objeto del dolar.",
                        "content": {
                            "application/json": {
                                "schema": dolar
                            }
                        }
                    }
                }
            }
        },


        "/dolares/promedio": {
            "get": {
                "tags": ["/dolares/promedio"],
                "summary": "Promedio de los dolares.",
                "description": "Muestra el valor promedio de compra de los 12 tipos de dólares en Argentina.",
                "responses": {
                    "200": {
                        "description": "Promedio del valor de todos los dolares.",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "type": "integer",
                                }
                            }
                        }
                    }
                }
            }
        },

        "/dolares/save_to_historico": {
            "post": {
                "tags": ["/dolares/save_to_historico"],
                "summary": "Guarda los datos los datos históricos proporcionados.",
                "description": "Guarda los datos históricos proporcionado del dólar especificado en la base de datos.",
                "requestBody": save_to_historico_body,
                "parameters": save_to_historico_req_params,
                "responses": {
                    "404": {
                        "description": "No se ha encontrado el dolar."
                    },
                    "200": {
                        "description": "Datos del dolar guardados correctamente.",
                    }
                }
            }
        }
    }
}

