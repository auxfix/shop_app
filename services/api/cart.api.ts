import { Cart, CartDl } from '../data/cart.dl';

export class CartApi {
  static async getCartByUserId(userId: number): Promise<Cart[]> {
    const cartDl = new CartDl();

    return cartDl.getCartByUserId(userId);
  }

  static async addToCart(product: Cart): Promise<Cart> {
    const cartDl = new CartDl();
    return cartDl.addProductToCart(product);
  }
}