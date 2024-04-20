import { DataLayer } from './util.dl';

export interface Order {
  id: number;
  userId: number;
  totalPrice: number;
  firstName: string;
  lastName: string;
  email: string;
}

export class OrdersDl{
   async findAll(): Promise<Order[]> {
    const db = await DataLayer.asyncopenDatabase();
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM orders',
          [],
          (_, { rows }) => {
            const orders: Order[] = [];
            for (let i = 0; i < rows.length; i++) {
              const { id, userId, totalPrice, firstName, lastName, email } = rows.item(i);
              orders.push({ id, userId, totalPrice, firstName, lastName, email });
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
  async findByOrderId(orderId: number): Promise<Order> {
    const db = await DataLayer.asyncopenDatabase();
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM orders WHERE id = ?',
          [orderId],
          (_, { rows }) => {
            const { id, userId, totalPrice, firstName, lastName, email } = rows.item(i);
            resolve({ id, userId, totalPrice, firstName, lastName, email });
          },
          (_, error) => {
            reject(error);
            return true;
          }
        );
      });
    });
  }
  async addOrder(order: Order): Promise<Order> {
    const db = await DataLayer.asyncopenDatabase();
    const { userId, totalPrice, firstName, lastName, email } = order;
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO order_items (userId, totalPrice, firstName, lastName, email) VALUES (?, ?, ?, ?, ?)',
          [userId, totalPrice, firstName, lastName, email],
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
}