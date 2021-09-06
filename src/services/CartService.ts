import {CRUD} from "./interfaces/CRUD";
import {User} from "../entities/User";
import {CartStatus} from "../enums/CartStatus";
import {getConnection} from "typeorm";
import {Cart} from "../entities/Cart";
import {CartItem} from "../entities/CartItem";

class CartService  {

    findCartByUserAndStatus(user: User, status: CartStatus) {
        return getConnection().getRepository(Cart).find({
            where: [
                { status: status, user: user}
            ],
            relations: ['cartItems', 'cartItems.product'],
        })
    }

    findById(id: number) {
        return getConnection().getRepository(CartItem).findOne(id);
    }

}

export default new CartService();