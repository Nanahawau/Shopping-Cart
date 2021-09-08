export class ErrorResponse {
    private code: number;
    private message: string;
    private errors: Object;


    constructor(code: number, message: string, errors = {}) {
        this.code = code;
        this.message = message;
        this.errors = errors;
    }
}