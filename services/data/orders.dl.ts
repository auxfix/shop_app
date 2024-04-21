import { DataLayer } from './util.dl';

export interface Order {
  id?: number;
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
            const { id, user_Id, tota_Price, first_name, last_name, email } = rows.item(0);
            resolve({ id, userId: user_Id, totalPrice: tota_Price, firstName: first_name, lastName: last_name, email });
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
    const { totalPrice, firstName, lastName, email } = order;
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO orders (total_price, first_name, last_name, email) VALUES (?, ?, ?, ?)',
          [totalPrice, firstName, lastName, email],
          (_, result) => {
            tx.executeSql(
              'SELECT * FROM orders WHERE id = last_insert_rowid()',
              [],
              (_,result) => {
                  resolve(result.rows.item(0))
              }
            );
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