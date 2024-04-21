import { DataLayer } from './util.dl';

export interface Cart {
  id?: number;
  userId: number;
  productId: number;
  productName: string;
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
              const { id, userId, productId, productName } = rows.item(i);
              orders.push({ id, userId, productId, productName });
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
        const { userId, productId, productName } = cart;
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO order_items (user_id, product_id, product_name ) VALUES (?, ?, ?)',
                [userId, productId, productName],
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