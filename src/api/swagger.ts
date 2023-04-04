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
        "/": {
            "get": {
                "tags": "/",
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
                "tags": "/",
                "summary": "Inserta un nuevo tipo de dólar.",
                "description": "Inserta un nuevo tipo de dólar en la base de datos, en caso de haber especificado todos los datos requeridos para ello en el request.",
                "parameters": [
                    {
                        "name": "dolar",
                        "in": "body",
                        "required": true,
                        "description": "Objeto del dolar.",
                        "schema": dolar
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Nuevo tipo de dolar creado correctamente."
                    }
                }
            },
            "put": {
                "tags": "/",
                "summary": "Sobreescribe un tipo de dólar.",
                "description": "Sobreescribe los datos de un tipo de dólar en la base de datos.",
                "parameters": [
                    {
                        "name": "target",
                        "in": "body",
                        "required": true,
                        "description": "Tipo de dolar",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "target": { "type": "string" }
                            }
                        }
                    },
                    {
                        "name": "dolar",
                        "in": "body",
                        "required": true,
                        "description": "Objeto del dolar",
                        "schema": dolar
                    }
                ],
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
                "tags": "/",
                "summary": "Actualiza campos de un tipo de dólar.",
                "description": "Actualiza los campos ingresados de un tipo de dólar en la base de datos.",
                "parameters": [
                    {
                        "name": "target",
                        "in": "body",
                        "required": true,
                        "description": "Tipo de dolar",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "target": { "type": "string" }
                            }
                        }
                    },
                    {
                        "name": "dolar",
                        "in": "body",
                        "required": true,
                        "description": "Objeto del dolar",
                        "schema": dolar
                    }
                ],
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
                "tags": "/",
                "summary": "Eliminar un tipo de dólar.",
                "description": "Eliminar un tipo de dólar en la base de datos.",
                "parameters": [
                    {
                        "name": "tipo_dolar",
                        "in": "body",
                        "required": true,
                        "description": "Tipo de dolar",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "tipo_dolar": { "type": "string" }
                            }
                        }
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

        "/promedio_dolares": {
            "get": {
                "tags": ["/promedio_dolares"],
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

        "/:tipo": {
            "get": {
                "tags": ["/:tipo"],
                "summary": "Devuelve los datos del dolar.",
                "description": "Muestra los valores del dólar especificado por su tipo.",
                "parameters": [
                    {
                        "name": "tipo",
                        "in": "URL",
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

        "/:tipo/save_values": {
            "get": {
                "tags": ["/:tipo/save_values"],
                "summary": "Guarda los datos del mercado del dolar.",
                "description": "Guarda los valores del mercado del dólar especificado por su tipo en su historial.",
                "parameters": [
                    {
                        "name": "tipo",
                        "in": "URL",
                        "required": true,
                        "description": "Tipo del dolar",
                        "schema": { "type": "string" }
                    }
                ],
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