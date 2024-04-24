import { CartApi } from '~/services/api/cart.api';
import { CartItem } from '~/services/data/cart.dl';
import { fakeCartDl } from '~/services/data/fake/cart.fake.dl';

const USER_ID = 1;

const TEST_CART_ITEM: CartItem = {
  price: 1.7,
  productId: 5,
  productName: 'Tomato',
  userId: USER_ID,
};

const cartApiWithFakeCartDl = new CartApi(fakeCartDl);

describe('Api -> Cart', () => {
  it('Init Cart API should return fake data', async () => {
    const fakeCartData = fakeCartDl.getFakeCart();
    const fakeCartDataFromApi = await cartApiWithFakeCartDl.getCartByUserId(USER_ID);

    expect(fakeCartData.length).toEqual(fakeCartDataFromApi.length);

    expect(fakeCartData[0].productId).toEqual(fakeCartDataFromApi[0].productId);
    expect(fakeCartData[0].productName).toEqual(fakeCartDataFromApi[0].productName);
    expect(fakeCartData[0].userId).toEqual(fakeCartDataFromApi[0].userId);
  });

  it('Cart Api can not change fake DL cart', async () => {
    await cartApiWithFakeCartDl.addToCart(TEST_CART_ITEM);

    const fakeCartDataFromApi = await cartApiWithFakeCartDl.getCartByUserId(USER_ID);
    expect(fakeCartDataFromApi.length).toEqual(2);
  });

  it('Cart Api can clear fake DL cart', async () => {
    await cartApiWithFakeCartDl.cleanCart(USER_ID);

    const fakeCartData = fakeCartDl.getFakeCart();
    const fakeCartDataFromApi = await cartApiWithFakeCartDl.getCartByUserId(USER_ID);
    expect(fakeCartDataFromApi.length).toEqual(0);
    expect(fakeCartData.length).toEqual(0);
  });
});
