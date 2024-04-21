import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';
const shopDataBase = require('~/assets/db/shop.db');


let db: SQLite.SQLiteDatabase | null = null;

export class DataLayer {
    static async asyncopenDatabase(): Promise<SQLite.SQLiteDatabase> {
      if(db) return db; 
      if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
          await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
        }
        const asset = await Asset.fromModule(shopDataBase).downloadAsync();
        await FileSystem.copyAsync({
          from: asset.localUri!,
          to: FileSystem.documentDirectory + 'SQLite/myDatabaseName.db',
        });
        db = SQLite.openDatabase('myDatabaseName.db');
        return db;
      }    
}