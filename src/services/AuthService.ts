import {getConnection, getCustomRepository, getRepository} from "typeorm";
import {User} from "../entities/User";
import {UserRepository} from "../repositories/UserRepository";
import {Cart} from "../entities/Cart";
import {CartItem} from "../entities/CartItem";
import {CartStatus} from "../enums/CartStatus";

class AuthService {

    /**
     * This method finds a user by email
     * @param email
     */
    findByEmail(email: string): Promise<any> {
        return getRepository(User).findOne({
            where: [
                {email: email}
            ],
            relations: ['carts']
        })
    }
}

export default new AuthService();