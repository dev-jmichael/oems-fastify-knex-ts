export const successResponse = (statusCode: number, payload: Object, message?: string) => {
    return {
        statusCode: statusCode,
        message: message,
        payload: payload
    }
}

export const errorResponse = (statusCode: number, error: string, message: string, errorCode: string) => {
    return {
        statusCode: statusCode,
        error: error,
        message: message,
        errorCode: errorCode
    }
}