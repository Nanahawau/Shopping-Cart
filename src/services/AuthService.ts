import {CRUD} from "./interfaces/CRUD";

class AuthService implements CRUD {
    create(resource: any): Promise<any> {
        return Promise.resolve(undefined);
    }

    deleteById(id: string): Promise<string> {
        return Promise.resolve("");
    }

    list(limit: number, page: number): Promise<any> {
        return Promise.resolve(undefined);
    }

    patchById(id: string, resource: any): Promise<string> {
        return Promise.resolve("");
    }

    putById(id: string, resource: any): Promise<string> {
        return Promise.resolve("");
    }

    readById(id: string): Promise<any> {
        return Promise.resolve(undefined);
    }

}