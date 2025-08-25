import { Request, Response } from "express";
import ReplValidation from "../validations/repl.validation";
import { replModel } from "../db/mongo/repl.db";
import responseUtils from "../utils/response.utils";
import constantUtils from "../utils/constant.utils";


export default class ReplController {


    public static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const validation = ReplValidation.replCreateBody.validate(req.body);
            if (validation.error) {
                return res.json(responseUtils.error(validation.error.message));
            }

            const userId = req.headers['user-id'];
            const replDbRes = await replModel.create({
                language: req.body.language,
                userId: userId,
            });

            if (!replDbRes) {
                return res.json(responseUtils.error("Failed to create repl"));
            }

            return res.json(responseUtils.success("Repl created successfully"));

        } catch (err) {
            console.log("Error in creating repl: ", err);
            return res.json(constantUtils.sendServerError(err as Error));
        }
    }
}
