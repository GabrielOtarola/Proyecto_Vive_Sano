import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db: SQLiteDBConnection | undefined;

  constructor(private storage: Storage) {
    this.initWebStorage();
  }

  async initWebStorage() {
    await this.storage.create(); // Inicializa el almacenamiento web
  }

  async initDB() {
    try {
      // Verificar si estamos en una plataforma web
      if (Capacitor.getPlatform() === 'web') {
        console.warn('SQLite no es compatible con la web. Usando almacenamiento web.');
        return;
      }

      const connection: SQLiteDBConnection | void = await CapacitorSQLite.createConnection({
        database: 'mydb',
        version: 1,
        encrypted: false,
        mode: 'no-encryption'
      });

      if (connection !== undefined) {
        this.db = connection;
        await this.createTables();
      } else {
        console.error('La conexión a la base de datos no está inicializada.');
      }
    } catch (error) {
      console.error('Error inicializando la base de datos', error);
    }
  }

  async createTables() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY NOT NULL,
        username TEXT NOT NULL,
        password TEXT NOT NULL
      );
    `;
    if (this.db) {
      await this.db.execute(createTableQuery);
    } else {
      console.error('La conexión a la base de datos no está inicializada.');
    }
  }

  async addUser(username: string, password: string) {
    if (Capacitor.getPlatform() === 'web') {
      // Almacenamiento en web
      await this.storage.set(username, { username, password });
    } else if (this.db) {
      const insertQuery = `
        INSERT INTO users (username, password) VALUES (?, ?);
      `;
      await this.db.run(insertQuery, [username, password]);
    } else {
      console.error('La conexión a la base de datos no está inicializada.');
    }
  }

  async getUser(username: string) {
    if (Capacitor.getPlatform() === 'web') {
      // Obtener usuario de almacenamiento web
      return await this.storage.get(username);
    } else if (this.db) {
      const selectQuery = `
        SELECT * FROM users WHERE username = ?;
      `;
      const result = await this.db.query(selectQuery, [username]);
      return result?.values;
    } else {
      console.error('La conexión a la base de datos no está inicializada.');
      return null;
    }
  }
}
