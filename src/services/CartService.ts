import {User} from "../entities/User";
import {CartStatus} from "../enums/CartStatus";
import {Cart} from "../entities/Cart";
import {CartItem} from "../entities/CartItem";
import {ProductVariation} from "../entities/ProductVariation";
import {getRepository, Repository} from "typeorm";
import {remove} from "winston";


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
        return getRepository(Cart).findOne(id);
    }

    /**
     * This method finds cart by id
     * @param id
     */
    findCartItemById(id: number): Promise<any> {
        return getRepository(CartItem).findOne({
            where: [
                {id: id}
            ],
            relations: ['cart', 'cart.cartItems', 'productVariant']
        });
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

        //
        await this.createcartItems(newCart, quantity, variant);

        return newCart;
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
        cart.total = parseInt(String(cart.total)) + (parseInt(String(variant.price)) * parseInt(String(quantity)));
        cart.cartItems = [...cart.cartItems, newCartItems];
        return getRepository(Cart).save(cart);
    }

    /**
     * This method checks if product variant already exists in cart
     */
    async isProductVariantInCart(variant: ProductVariation): Promise<any> {
        return getRepository(CartItem).findOne({
            where: [
                {productVariant: variant}
            ],
            relations: ['productVariant', 'cart']
        })
    }


    /**
     * This method increases quantity of an item in a cart
     * @param cartItem
     * @param quantity
     */
    async updateQuantity(cartItem: CartItem, quantity: number, cart: Cart) {
        cartItem.quantity = quantity
        const total = parseInt(String(quantity)) * parseInt(String(cartItem.productVariant.price));
        cartItem.cart.total = parseInt(String(total));
        await getRepository(CartItem).save(cartItem);
        return await this.increaseCartTotal(cart, cartItem.cart.total);
    }


    /**
     * increase cart total
     */
    async increaseCartTotal(cart: Cart, total: number) {
        cart.total = total;
        return await getRepository(Cart).save(cart);
    }



    /**
     * This method deletes a cart item
     * @param itemId
     */
    async delete(itemId: string): Promise<any> {
        const cartItem = await this.findCartItemById(parseInt(itemId))
        if (cartItem) {
            console.log(JSON.stringify(cartItem.cart) + "quantity")
            cartItem.cart.cartItems.length == 0? await this.removeCart(cartItem) :
                await this.deleteCartItem(cartItem);
        }
    }


    /**
     * Decrease total in cart
     * @param cartItem
     */
    async deleteCartItem (cartItem: CartItem ) {
        cartItem.cart.total = parseInt(String(cartItem.cart.total)) - parseInt(String(cartItem.productVariant.price));
        await getRepository(Cart).save(cartItem.cart);
        await getRepository(CartItem).delete(cartItem);
    }


    /**
     * check if cart items is empty and remove cart
     */
    async removeCart(cartItem: CartItem) {
         if (cartItem.cart.cartItems.length == 0) {
             await getRepository(Cart).delete(cartItem.cart);
         }
    }

    /**
     * This method deletes a cart
     * @param cartId
     */
    async deleteCart(user: User): Promise<any> {
        // Fetch active cart of logged in user
        const cart = await this.findCartItemByUserAndStatus(user, CartStatus.ACTIVE);
        return await getRepository(Cart).delete(cart);
    }


    /**
     * Checks if quantity requested to be added to cart exceeds stock level
     */
    isQuantityGreaterThanStockLevel (variant: ProductVariation, quantity: number, cartItem?: CartItem, ){
        let quantityInCart;
        const stockLevel = variant.stockLevel;
        if (cartItem) {
            quantityInCart = cartItem.quantity;

            return (parseInt(String(quantityInCart)) + parseInt(String(quantity))) > parseInt(String(stockLevel));
        }
        quantityInCart = 0;
        return (parseInt(String(quantityInCart)) + parseInt(String(quantity))) > parseInt(String(stockLevel));
    }


}

export default new CartService();