export class ResponseBuilder<T> {
    constructor(
    public error?: Error,
    public data?: Array<T>,
    public status?: number,
    public phrase?: string,
    public message?: string,
    public timestamp?: number
    ) {}
}
