interface ResponseUtil {
    status: "success" | "error";
    responseCode: number;
    message: string;
    data: any;
}

function success(message: string, data?: any): ResponseUtil {
    return {
        status: 'success',
        responseCode: 200,
        message: message,
        data: data??null
    };
}

function error(message: string, data?: any): ResponseUtil {
    return {
        status: 'error',
        responseCode: 500,
        message: message,
        data: data??null
    };
}

export default {
    success,
    error
}