import {EntityRepository, Repository} from "typeorm";
import {Cart} from "../entities/Cart";
import {CartStatus} from "../enums/CartStatus";
import {User} from "../entities/User";

@EntityRepository(Cart)
export class CartRepository extends Repository<Cart> {



}