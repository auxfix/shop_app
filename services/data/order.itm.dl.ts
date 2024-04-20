import { DataLayer } from './util.dl';

export interface OrderItem {
    id?: number;
    orderId: number;
    productId: number;
    productName: string;
}


export class OrderItemsDl {
   async addOrderItem(orderItem: OrderItem): Promise<OrderItem> {
    const db = await DataLayer.asyncopenDatabase();
    const { orderId, productId, productName } = orderItem;
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO order_items (orderId, productId, productName) VALUES (?, ?, ?)',
          [orderId, productId, productName],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve(orderItem);
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

  async listOrderItems(orderId: number): Promise<OrderItem[]> {
    const db = await DataLayer.asyncopenDatabase();
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM order_items WHERE orderId = ?',
          [orderId],
          (_, { rows }) => {
            const orders: OrderItem[] = [];
            for (let i = 0; i < rows.length; i++) {
              const { id, orderId, productId, productName } = rows.item(i);
              orders.push({ id, orderId, productId, productName });
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
}