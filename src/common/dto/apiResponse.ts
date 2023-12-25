export const success = (statusCode: number, payload: Object | undefined, message?: string) => {
    return {
        statusCode: statusCode,
        message: message,
        payload: payload
    }
}

export const error = (statusCode: number, error: string, message: string, errorCode: string) => {
    return {
        statusCode: statusCode,
        error: error,
        message: message,
        errorCode: errorCode
    }
}