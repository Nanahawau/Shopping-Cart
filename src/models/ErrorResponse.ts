export class ErrorResponse {
    private code: number;
    private message: string;
    private errors: Object;


    constructor(code: number, message: string, errors: Object) {
        this.code = code;
        this.message = message;
        this.errors = errors;
    }
}