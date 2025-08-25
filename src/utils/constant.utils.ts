import serverEnv from "../config/serverEnv.config";
import responseUtils from "./response.utils";

export default class constantUtils {
    public static sendServerError(error: Error) {
        return responseUtils.error(serverEnv.SERVER_ENVIRONMENT === 'dev' ? error.message : "Internal server error");
    }
}