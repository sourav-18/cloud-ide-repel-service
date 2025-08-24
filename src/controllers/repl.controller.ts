import { Request, Response } from "express";


const create = (req: Request, res: Response): Response => {
    return res.json({
        status: "success",
        responseCode: 200,
        message: "REPL Service is running successfully.",
        data: null
    });
}

export default {
    create:create
}