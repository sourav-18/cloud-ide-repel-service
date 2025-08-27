import { Request, Response } from "express";
import ReplValidation from "../validations/repl.validation";
import { replModel } from "../db/mongo/repl.db";
import responseUtils from "../utils/response.utils";
import constantUtils from "../utils/constant.utils";
import S3Utils from "../utils/s3.utils";
import PATH from "path";



export default class ReplController {


    public static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const localFolderPath: string = PATH.join(process.cwd(), 'files/nodejs-file');
            const s3FolderPath: string = 'base-code-files/nodejs-files/';
            S3Utils.uploadFolder(localFolderPath, s3FolderPath);
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
