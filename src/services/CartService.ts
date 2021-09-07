import {User} from "../entities/User";
import {CartStatus} from "../enums/CartStatus";
import {Cart} from "../entities/Cart";
import {CartItem} from "../entities/CartItem";
import {ProductVariation} from "../entities/ProductVariation";
import {getRepository} from "typeorm";


class CartService {

    /**
     * This method finds cart by user and cart status
     * @param user
     * @param status
     */
    findCartByUserAndStatus(user: User, status: CartStatus): Promise<any> {
        return getRepository(Cart).findOne({
            where: [
                {status: status, user: user}
            ],
            relations: ['cartItems']
        })
    }

    /**
     * This method finds cart items by user and cart status
     * @param user
     * @param status
     */
    findCartItemByUserAndStatus(user: User, status: CartStatus): Promise<any> {
        return getRepository(Cart).find({
            where: [
                {status: status, user: user}
            ],
            relations: ['cartItems', 'cartItems.productVariant', 'cartItems.productVariant.product']
        })
    }

    /**
     * This method finds cart item by id
     * @param id
     */
    findById(id: number): Promise<any> {
        return getRepository(CartItem).findOne(id);
    }


    /**
     * This method creates a cart
     * @param user
     * @param quantity
     * @param variant
     */
    async createCart(user: User, quantity: number, variant: ProductVariation): Promise<any> {
        const cart = new Cart();
        cart.user = user;
        cart.status = CartStatus.ACTIVE;
        cart.total = variant.price;
        const newCart = await getRepository(Cart).save(cart);
        return await this.createcartItems(newCart, quantity, variant);
    }


    /**
     * This method creates a new cart item.
     * @param cart
     * @param quantity
     * @param variant
     */

    async createcartItems(cart: Cart, quantity: number, variant: ProductVariation) {
        const cartItems = new CartItem();
        cartItems.quantity = quantity;
        cartItems.productVariant = variant;
        cartItems.cart = cart;
        return getRepository(CartItem).save(cartItems);
    }


    /**
     * This method adds an item to already existing cart.
     * @param cart
     * @param quantity
     * @param variant
     */
    async addToCartItems(cart: Cart, quantity: number, variant: ProductVariation): Promise<any> {
        const cartItems = new CartItem();
        cartItems.quantity = quantity;
        cartItems.productVariant = variant;
        const newCartItems = await getRepository(CartItem).save(cartItems);
        cart.total = parseInt(String(cart.total)) + parseInt(String(variant.price));
        cart.cartItems = [...cart.cartItems, newCartItems];
        return getRepository(Cart).save(cart);
    }

    /**
     * This method checks if product variant already exists in cart
     */
    async isProductVariantInCart (variant : ProductVariation): Promise<any> {
        return getRepository(CartItem).findOne({
            where: [
                {productVariant: variant}
            ],
        })
    }


    /**
     * This method increases quantity of an item in a cart
     * @param cartItem
     * @param quantity
     */
    async increaseQuantity (cartItem : CartItem, quantity: number) {
        cartItem.quantity = parseInt(String(cartItem.quantity)) + parseInt(String(quantity));
        await getRepository(CartItem).save(cartItem);
    }

    /**
     * This method deletes a cart item
     * @param itemId
     */
    async deleteCartItem(itemId: string): Promise<any> {
        const cartItem = await getRepository(CartItem)
        return await cartItem.delete(itemId);
    }

    /**
     * This method deletes a cart
     * @param cartId
     */
    async deleteCart(cartId: string): Promise<any> {
        const cart = await getRepository(Cart);
        return await cart.delete(cartId);
    }

}

export default new CartService();