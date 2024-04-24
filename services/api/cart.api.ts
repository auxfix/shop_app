import { CartDl, CartItem } from '../data/cart.dl';

export class CartApi {
  private cartDl: CartDl;

  constructor(cartDl: CartDl) {
    this.cartDl = cartDl;
  }

  async getCartByUserId(userId: number): Promise<CartItem[]> {
    return this.cartDl.getCartByUserId(userId);
  }

  async addToCart(product: CartItem): Promise<CartItem> {
    return this.cartDl.addProductToCart(product);
  }

  async cleanCart(userId: number): Promise<void> {
    return this.cartDl.cleanCartByUserId(userId);
  }
}
