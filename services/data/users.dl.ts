import { DataLayer } from './util.dl';

export class User  {
  id!: number;
  username!: string;
  password!: string;
  role!: string;
}

export class UsersDataLayer {
    async findAll(): Promise<User[]> {
        const db = await DataLayer.asyncopenDatabase();
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT * FROM users',
              [],
              (_, { rows }) => {
                resolve(rows._array);
              },
              (_, error) => {
                reject(error);
                return true;
              }
            );
          });
        });
      }
    
      async findOne(username: string, password: string): Promise<User> {
        const db = await DataLayer.asyncopenDatabase();
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT * FROM users WHERE username = ? and password = ?',
              [username, password],
              (_, { rows }) => {
                resolve(rows.length > 0 ? rows.item(0) : null);
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