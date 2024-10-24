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
    await this.storage.create();
  }

  async initDB() {
    try {
      if (Capacitor.getPlatform() === 'web') {
        console.warn('SQLite no es compatible con la web. Usando almacenamiento web.');
        return;
      }

      const connection = await CapacitorSQLite.createConnection({
        database: 'mydb',
        version: 1,
        encrypted: false,
        mode: 'no-encryption'
      });

      if (typeof connection !== 'undefined') {
        this.db = connection as SQLiteDBConnection;
        await this.db.open();
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
      CREATE TABLE IF NOT EXISTS recetas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT NOT NULL
      );
    `;
    if (this.db) {
      await this.db.execute(createTableQuery);
    } else {
      console.error('La conexión a la base de datos no está inicializada.');
    }
  }

  async addReceta(nombre: string, descripcion: string) {
    if (this.db) {
      const insertQuery = `
        INSERT INTO recetas (nombre, descripcion) VALUES (?, ?);
      `;
      await this.db.run(insertQuery, [nombre, descripcion]);
    } else {
      console.error('La conexión a la base de datos no está inicializada.');
    }
  }

  async getRecetas(): Promise<any[]> {
    if (this.db) {
      const selectQuery = `
        SELECT * FROM recetas;
      `;
      const result = await this.db.query(selectQuery);
      return result?.values || [];
    } else {
      console.error('La conexión a la base de datos no está inicializada.');
      return [];
    }
  }

  async updateReceta(id: number, nombre: string, descripcion: string) {
    if (this.db) {
      const updateQuery = `
        UPDATE recetas SET nombre = ?, descripcion = ? WHERE id = ?;
      `;
      await this.db.run(updateQuery, [nombre, descripcion, id]);
    } else {
      console.error('La conexión a la base de datos no está inicializada.');
    }
  }

  async deleteReceta(id: number) {
    if (this.db) {
      const deleteQuery = `
        DELETE FROM recetas WHERE id = ?;
      `;
      await this.db.run(deleteQuery, [id]);
    } else {
      console.error('La conexión a la base de datos no está inicializada.');
    }
  }
}
