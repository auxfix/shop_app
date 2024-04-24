import { CartApi } from '~/services/api/cart.api';
import { CartItem, cartDl } from '~/services/data/cart.dl';

const cartApi = new CartApi(cartDl);

const USER_ID = 1;

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
  },
];

describe('Integration -> Cart', () => {
  beforeEach(async () => {
    await cartApi.cleanCart(USER_ID);
  });

  it('Init cart should be empty', async () => {
    const cart = await cartApi.getCartByUserId(USER_ID);
    expect(cart.length).toEqual(0);
  });

  it('Cart should be populated successfully', async () => {
    const cart = await cartApi.getCartByUserId(USER_ID);
    expect(cart.length).toEqual(0);

    await cartApi.addToCart(TEST_CART_ITEMS[0]);
    await cartApi.addToCart(TEST_CART_ITEMS[1]);

    const notEmptyCart = await cartApi.getCartByUserId(USER_ID);
    expect(notEmptyCart.length).toEqual(2);

    expect(notEmptyCart[0].productName).toEqual(TEST_CART_ITEMS[0].productName);
    expect(notEmptyCart[0].price).toEqual(TEST_CART_ITEMS[0].price);

    expect(notEmptyCart[1].productName).toEqual(TEST_CART_ITEMS[1].productName);
    expect(notEmptyCart[1].price).toEqual(TEST_CART_ITEMS[1].price);
  });

  it('Cart should be empty after the clean up', async () => {
    const cart = await cartApi.getCartByUserId(USER_ID);
    expect(cart.length).toEqual(0);

    await cartApi.addToCart(TEST_CART_ITEMS[0]);
    await cartApi.addToCart(TEST_CART_ITEMS[1]);

    const notEmptyCart = await cartApi.getCartByUserId(USER_ID);
    expect(notEmptyCart.length).toEqual(2);

    await cartApi.cleanCart(USER_ID);

    const empty = await cartApi.getCartByUserId(USER_ID);
    expect(empty.length).toEqual(0);
  });
});
