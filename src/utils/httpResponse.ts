export function httpOk(data:unknown,status:number){
    return {
        status:status,
        body:data
    }
}

export function httpError(message:unknown,code:string){
    return {
        statusCode:code,
        error:message
    }
}