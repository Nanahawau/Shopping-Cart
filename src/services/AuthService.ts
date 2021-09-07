import {getConnection, getCustomRepository} from "typeorm";
import {User} from "../entities/User";
import {UserRepository} from "../repositories/UserRepository";
import {Cart} from "../entities/Cart";
import {CartItem} from "../entities/CartItem";

class AuthService {

    /**
     * This method finds a user by email
     * @param email
     */
    findByEmail(email: string): Promise<any> {
        return getCustomRepository(UserRepository).findByEmail(email);
    }
}

export default new AuthService();