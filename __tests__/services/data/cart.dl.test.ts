import { CartItem, cartDl } from '~/services/data/cart.dl';

const USER_ID = 1

const TEST_CART_ITEMS: CartItem[] = [
  { 
    price: 1.2,
    productId: 1,
    productName: 'Banana',
    userId: USER_ID,
  },
  { 
    price: 1.4,
    productId: 1,
    productName: 'Potato',
    userId: USER_ID,
  }
]

describe('Data Layer -> Cart', () => {

  beforeEach(async () => {
    await cartDl.cleanCartByUserId(USER_ID);
  })

  it('Init cart DL should be empty', async () => {
    const cart = await cartDl.getCartByUserId(USER_ID);
    expect(cart.length).toEqual(0);
  });

  it('Cart DL should be populated successfully', async () => {
    const cart = await cartDl.getCartByUserId(USER_ID);
    expect(cart.length).toEqual(0);

    await cartDl.addProductToCart(TEST_CART_ITEMS[0]);
    await cartDl.addProductToCart(TEST_CART_ITEMS[1]);

    const notEmptyCart = await cartDl.getCartByUserId(USER_ID);
    expect(notEmptyCart.length).toEqual(2);

    expect(notEmptyCart[0].productName).toEqual(TEST_CART_ITEMS[0].productName);
    expect(notEmptyCart[0].price).toEqual(TEST_CART_ITEMS[0].price);

    expect(notEmptyCart[1].productName).toEqual(TEST_CART_ITEMS[1].productName);
    expect(notEmptyCart[1].price).toEqual(TEST_CART_ITEMS[1].price);
  });

  it('Cart DL should be empty after the clean up', async () => {
    const cart = await cartDl.getCartByUserId(USER_ID);
    expect(cart.length).toEqual(0);

    await cartDl.addProductToCart(TEST_CART_ITEMS[0]);
    await cartDl.addProductToCart(TEST_CART_ITEMS[1]);

    const notEmptyCart = await cartDl.getCartByUserId(USER_ID);
    expect(notEmptyCart.length).toEqual(2);

    await cartDl.cleanCartByUserId(USER_ID);

    const empty = await cartDl.getCartByUserId(USER_ID);
    expect(empty.length).toEqual(0);
  });
});
