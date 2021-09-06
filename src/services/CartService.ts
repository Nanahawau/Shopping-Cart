import {User} from "../entities/User";
import {CartStatus} from "../enums/CartStatus";
import {getConnection, getRepository} from "typeorm";
import {Cart} from "../entities/Cart";
import {CartItem} from "../entities/CartItem";
import {ProductVariation} from "../entities/ProductVariation";




class CartService {


    findCartByUserAndStatus(user: User, status: CartStatus): Promise<any> {
        return getRepository(Cart).findOne({
            where: [
                {status: status, user: user}
            ],
            relations: ['cartItems']
        })
    }

    findCartItemByUserAndStatus(user: User, status: CartStatus): Promise<any> {
        return getRepository(Cart).find({
            where: [
                {status: status, user: user}
            ],
            relations: ['cartItems', 'cartItems.productVariant', 'cartItems.productVariant.product']
        })
    }

    findById(id: number): Promise<any> {
        return getRepository(CartItem).findOne(id);
    }

    async createCart(user: User, quantity: number, variant: ProductVariation): Promise<any> {
        const cart = new Cart();
        cart.user = user;
        cart.status = CartStatus.ACTIVE;
        cart.total = variant.price;
        const newCart = await getRepository(Cart).save(cart);

        const cartItems = new CartItem();
        cartItems.quantity = quantity;
        cartItems.productVariant = variant;
        cartItems.cart = newCart;
        return getRepository(CartItem).save(cartItems);

    }

    async addToCartItems(cart: Cart, quantity: number, variant: ProductVariation): Promise<any> {
        const cartItems = new CartItem();
        cartItems.quantity = quantity;
        cartItems.productVariant = variant;
        const newCartItems = await getRepository(CartItem).save(cartItems);
        cart.total = parseInt(String(cart.total)) + parseInt(String(variant.price));
        cart.cartItems = [...cart.cartItems, newCartItems];
        return getRepository(Cart).save(cart);
    }


    // async checkProductVariantExistInCart(cart: Cart, productVariant: ProductVariation) : Promise<any>  {
    //     const cartItems = cart.cartItems;
    //     cartItems.find()
    //
    // }

    async deleteCartItem(itemId: string): Promise<any> {
        const cartItem =  await getRepository(CartItem)
        return await cartItem.delete(itemId);
    }


    async deleteCart(cartId: string): Promise<any> {
       const cart = await getRepository(Cart);
        return await cart.delete(cartId);
    }

}

export default new CartService();