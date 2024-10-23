class ApiError extends Error {
    statusCode:number
    message: string
    errors:any
    stack?: string | undefined
    data: null
    success: boolean

    constructor(
        statusCode:number,
        message:string= "Something went wrong",
        errors = [],
        stack = "",
        
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export {ApiError}