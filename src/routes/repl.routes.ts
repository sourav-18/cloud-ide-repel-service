import { Router } from "express";
import replController from "../controllers/repl.controller";

class ReplRoutes {
    private router: Router;
    private static instance: ReplRoutes = new ReplRoutes();

    private constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    public static getRouter():Router{
        return ReplRoutes.instance.router;
    }

    private initializeRoutes() {
        this.router.post("/",replController.create);
    }
}

export default ReplRoutes.getRouter();