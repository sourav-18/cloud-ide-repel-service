import dotenv from "dotenv";
dotenv.config();
import serverEnv from "./config/serverEnv.config";
import express, { Request, Response, NextFunction } from "express";


const app = express();


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        res.json({
            status: "error",
            responseCode: 500,
            message: "Invalid Request. Please check the request and try again.",
            data: null
        });
        return;
    }
    next();

});

app.listen(serverEnv.SERVER_PORT, () => {
    console.log(`Proxy service is running on port ${serverEnv.SERVER_PORT}`);
});



