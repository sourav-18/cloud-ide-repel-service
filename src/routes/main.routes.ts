import { Router } from "express";
import replRoutes from "./repl.routes";

class MainRoutes {
    private router: Router;
    private static instance: MainRoutes = new MainRoutes();

    private constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    public static getRouter():Router{
        return MainRoutes.instance.router;
    }

    private initializeRoutes() {
        this.router.use("/repl", replRoutes);
    }
}

export default MainRoutes.getRouter();