import { CartDl, CartItem } from '~/services/data/cart.dl';

export class CartFakeDl extends CartDl {
  private fakeCart: CartItem[];

  constructor() {
    super();
    this.fakeCart = [
      {
        price: 1.2,
        productId: 1,
        productName: 'Banana',
        userId: 1,
      },
      {
        price: 1.4,
        productId: 1,
        productName: 'Potato',
        userId: 2,
      },
    ];
  }

  getFakeCart() {
    return this.fakeCart.slice();
  }

  async getCartByUserId(userId: number): Promise<CartItem[]> {
    return this.fakeCart.slice();
  }

  async cleanCartByUserId(userId: number): Promise<void> {
    this.fakeCart = [];
  }
}

export const fakeCartDl = new CartFakeDl();
