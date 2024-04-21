import { DataLayer } from './util.dl';

export interface Product  {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: number;
}

export class ProductDl {
  async findAll(): Promise<Product[]> {
    const db = await DataLayer.asyncopenDatabase();
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM products',
          [],
          (_, { rows }) => {
            const products: Product[] = [];
            for (let i = 0; i < rows.length; i++) {
              const { id, sku, name, description, price } = rows.item(i);
              products.push({ id, sku, name, description, price });
            }
            resolve(products);
          },
          (_, error) => {
            reject(error);
            return true;
          }
        );
      });
    });
  }
  async findProduct(productId: number): Promise<Product | undefined> {
    const db = await DataLayer.asyncopenDatabase();
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM products WHERE id = ?',
          [productId],
          (_, { rows }) => {
            if (rows.length === 1) {
              const { id, sku, name, description, price } = rows.item(0);
              resolve({ id, sku, name, description, price });
            } else {
              resolve(undefined);
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

  async save(product: Product): Promise<Product> {
    const db = await DataLayer.asyncopenDatabase();
    const {name, description, price, sku } = product;
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO products (name, description, price, sku) VALUES (?, ?, ?, ?)',
          [name, description, price, sku],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve(product);
            } else {
              reject(new Error('Failed to save product'));
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