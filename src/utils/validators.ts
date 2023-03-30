import express from "express"

export function has_valid_dollar_type(dollar_type: string | undefined, res: express.Response) {
    if (!dollar_type) {
        res.status(400).json({
            "Message": "Error: No se especificó el tipo de dolar."
        })

        return false
    }

    return true    
}