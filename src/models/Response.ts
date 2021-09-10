import exp from "constants";

export class Response {
   private code!: number;
   private message!: string;
   private data!: object;


    constructor(code: number, message: string, data = {}) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}