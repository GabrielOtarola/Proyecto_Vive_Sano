import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject | undefined; // Inicializado como undefined

  constructor(private sqlite: SQLite, private platform: Platform) {
    this.platform.ready().then(() => {
      this.initializeDatabase();
    });
  }

  private initializeDatabase() {
    this.sqlite.create({
      name: 'my_database.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      this.database = db; // Asignando el valor a la propiedad
      console.log('Base de datos inicializada correctamente');
      this.createTables(); // Llamamos a crear tablas al inicializar la base de datos
    })
    .catch(e => console.error('Error al inicializar la base de datos', e));
  }

  private createTables() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS recetas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT NOT NULL
      );
    `;
    if (this.database) {
      this.database.executeSql(createTableQuery, [])
        .then(() => console.log('Tabla recetas creada'))
        .catch(e => console.error('Error al crear la tabla recetas', e));
    } else {
      console.error('La conexión a la base de datos no está inicializada.');
    }
  }

  async addReceta(nombre: string, descripcion: string) {
    if (this.database) {
      const insertQuery = `INSERT INTO recetas (nombre, descripcion) VALUES (?, ?);`;
      await this.database.executeSql(insertQuery, [nombre, descripcion]);
    } else {
      console.error('La conexión a la base de datos no está inicializada.');
    }
  }

  async getRecetas(): Promise<any[]> {
    if (this.database) {
      const selectQuery = `SELECT * FROM recetas;`;
      const result = await this.database.executeSql(selectQuery, []);
      const recetas = [];

      for (let i = 0; i < result.rows.length; i++) {
        recetas.push(result.rows.item(i)); // Obtiene cada elemento de la fila
      }

      console.log('Recetas obtenidas:', recetas); // Verifica lo que se está devolviendo
      return recetas;
    } else {
      console.error('La conexión a la base de datos no está inicializada.');
      return [];
    }
  }

  async updateReceta(id: number, nombre: string, descripcion: string) {
    if (this.database) {
      const updateQuery = `UPDATE recetas SET nombre = ?, descripcion = ? WHERE id = ?;`;
      await this.database.executeSql(updateQuery, [nombre, descripcion, id]);
    } else {
      console.error('La conexión a la base de datos no está inicializada.');
    }
  }

  async deleteReceta(id: number) {
    if (this.database) {
      const deleteQuery = `DELETE FROM recetas WHERE id = ?;`;
      await this.database.executeSql(deleteQuery, [id]);
    } else {
      console.error('La conexión a la base de datos no está inicializada.');
    }
  }
}
