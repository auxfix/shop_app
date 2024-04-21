export interface CartItem {
  id?: number;
  userId?: number;
  productId?: number;
  productName?: string;
  price?: number
}

export class CartDl {

  private cart: CartItem[];
  
  constructor(){
    this.cart=[]
  }

  async getCartByUserId(userId: number): Promise<CartItem[]> {
    return this.cart.filter(ci => ci.userId == userId).slice();
  }

  async addProductToCart(cartItem: CartItem): Promise<CartItem> {
    const lastCartItem = +this.cart.sort((ciA, ciB) => ciA.id! - ciB.id!)[this.cart.length -1].id!;
    cartItem.id = lastCartItem + 1;
    this.cart.push(cartItem);
    return Object.create(cartItem, {});
  }

  async cleanCartByUserId(userId: number): Promise<void> {
    this.cart = this.cart.filter(ci => ci.userId != userId);
  }
}

export const cartDl = new CartDl();