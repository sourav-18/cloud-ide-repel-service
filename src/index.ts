import dotenv from "dotenv";
dotenv.config();
import serverEnv from "./config/serverEnv.config";
import express, { Request, Response, NextFunction } from "express";
import mainRoutes from "./routes/main.routes";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



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

app.use((req: Request, res: Response, next: NextFunction) => {
    req.headers['user-id'] = "64a7f3f4c9e77b6f4d6e8b1a"; //dummy user id
    next();
});

app.use("/api/v1", mainRoutes);

app.use((req: Request, res: Response) => {
    res.send("Invalid routes")
    console.log("invalid Url: ", req.originalUrl)
    return;
})

app.listen(serverEnv.SERVER_PORT, () => {
    console.log(`service is running on port ${serverEnv.SERVER_PORT}`);
});



