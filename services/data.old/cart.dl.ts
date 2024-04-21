import { DataLayer } from './util.dl';

export interface Cart {
  id?: number;
  userId?: number;
  productId?: number;
  productName?: string;
  price?: number
}

export class CartDl {
   async getCartByUserId(userId: number): Promise<Cart[]> {
    const db = await DataLayer.asyncopenDatabase();
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM cart_items where user_id = ?',
          [userId],
          (_, { rows }) => {
            const orders: Cart[] = [];
            for (let i = 0; i < rows.length; i++) {
              const { id, user_id, product_id, product_name, price } = rows.item(i);
              orders.push({ id, userId: user_id, productId: product_id, productName: product_name, price });
            }
            resolve(orders);
          },
          (_, error) => {
            reject(error);
            return true;
          }
        );
      });
    });
  }
  async addProductToCart(cart: Cart): Promise<Cart> {
    const db = await DataLayer.asyncopenDatabase();
    return new Promise((resolve, reject) => {
        const { userId, productId, productName, price } = cart;
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO cart_items (user_id, product_id, product_name, price ) VALUES (?, ?, ?, ?)',
                [userId!, productId!, productName!, price!],
                (_, result) => {
                if (result.rowsAffected > 0) {
                    resolve(result.rows.item(0))
                } else {
                    reject(new Error('Failed to make order'));
                }
                },
                (_, error) => {
                reject(error);
                return true;
                }
            );
        });
    });
  }

  async cleanCartByUserId(userId: number): Promise<void> {
    const db = await DataLayer.asyncopenDatabase();
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM cart_items WHERE userId = ?',
                [userId],
                (_, result) => {
                if (result.rowsAffected > 0) {
                    resolve()
                } else {
                    reject(new Error('Failed to make order'));
                }
                },
                (_, error) => {
                    reject(error);
                    return true;
                }
            );
        });
    });
  }
}