import {getConnection, getCustomRepository} from "typeorm";
import {User} from "../entities/User";
import {UserRepository} from "../repositories/UserRepository";

class AuthService {

    findByEmail(email: string): Promise<any> {
        return getConnection().getRepository(User).findOne(email);
    }


}

export default new AuthService();