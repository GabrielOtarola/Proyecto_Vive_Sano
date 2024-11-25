import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { RecetasService } from './recetas.service';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private database: SQLiteObject | undefined;

  constructor(private sqlite: SQLite, private platform: Platform, private recetasService: RecetasService) {
    this.platform.ready().then(() => {
      this.initializeDatabase();
    });
  }

  private async initializeDatabase() {
    try {
      const db = await this.sqlite.create({
        name: 'my_database.db',
        location: 'default',
      });
      this.database = db;
      console.log('Base de datos inicializada correctamente');
      await this.createOrUpdateTables();
      await this.syncWithJsonServer(); // Sincronizar datos con el servidor
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
    }
  }

  private async createOrUpdateTables() {
    try {
      if (this.database) {
        const addColumnQuery = `ALTER TABLE recetas ADD COLUMN jsonId INTEGER;`;
        await this.database.executeSql(addColumnQuery, [])
          .then(() => console.log('Columna jsonId añadida correctamente'))
          .catch(err => {
            if (!err.message.includes('duplicate column name')) {
              console.error('Error al añadir la columna jsonId:', err);
            }
          });

        const createTableQuery = `
          CREATE TABLE IF NOT EXISTS recetas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            descripcion TEXT NOT NULL,
            jsonId INTEGER
          );
        `;
        await this.database.executeSql(createTableQuery, []);
        console.log('Tabla recetas creada o actualizada correctamente');
      }
    } catch (error) {
      console.error('Error al crear o actualizar la tabla recetas:', error);
    }
  }

  private async syncWithJsonServer() {
    try {
      const jsonRecetas = await this.recetasService.getRecetas().toPromise();
      if (!jsonRecetas) {
        console.error('No se obtuvieron recetas del servidor.');
        return;
      }
      console.log('Recetas obtenidas del servidor:', jsonRecetas);

      for (const receta of jsonRecetas) {
        const insertQuery = `
          INSERT OR IGNORE INTO recetas (id, nombre, descripcion, jsonId) 
          VALUES (?, ?, ?, ?);
        `;
        await this.database?.executeSql(insertQuery, [null, receta.nombre, receta.descripcion, receta.id]);
      }
      console.log('Sincronización completada con JSON Server.');
    } catch (error) {
      console.error('Error al sincronizar con JSON Server:', JSON.stringify(error, null, 2));
    }
  }

  async addReceta(nombre: string, descripcion: string) {
    if (this.database) {
      try {
        const receta = { nombre, descripcion };
        const response = await this.recetasService.createReceta(receta).toPromise();
        const jsonId = response.id;

        const insertQuery = `INSERT INTO recetas (nombre, descripcion, jsonId) VALUES (?, ?, ?);`;
        await this.database.executeSql(insertQuery, [nombre, descripcion, jsonId]);

        console.log('Receta añadida en SQLite y JSON Server');
      } catch (error) {
        console.error('Error al añadir la receta:', error);
      }
    }
  }

  async getRecetas(): Promise<any[]> {
    if (this.database) {
      const selectQuery = `SELECT * FROM recetas;`;
      const result = await this.database.executeSql(selectQuery, []);
      const recetas = [];

      for (let i = 0; i < result.rows.length; i++) {
        recetas.push(result.rows.item(i));
      }
      return recetas;
    }
    return [];
  }

  async updateReceta(id: number, nombre: string, descripcion: string) {
    if (this.database) {
      try {
        // Obtener el jsonId de SQLite
        const jsonId = await this.getJsonIdFromSQLite(id);
        if (!jsonId) {
          console.error('No se encontró jsonId para la receta.');
          return;
        }

        // Actualizar en JSON Server
        const receta = { nombre, descripcion };
        await this.recetasService.updateReceta(jsonId, receta).toPromise();
        console.log('Receta actualizada en JSON Server');

        // Actualizar en SQLite
        const updateQuery = `UPDATE recetas SET nombre = ?, descripcion = ? WHERE id = ?;`;
        await this.database.executeSql(updateQuery, [nombre, descripcion, id]);
        console.log('Receta actualizada en SQLite');
      } catch (error) {
        console.error('Error al actualizar la receta:', error);
      }
    }
  }

  async deleteReceta(id: number) {
    try {
      if (this.database) {
        // Obtener el jsonId asociado al id local
        const jsonId = await this.getJsonIdFromSQLite(id);
        if (!jsonId) {
          console.error('No se encontró jsonId asociado a la receta.');
          return;
        }

        // Eliminar del servidor
        await this.recetasService.deleteReceta(jsonId).toPromise();
        console.log('Receta eliminada del servidor');

        // Eliminar de SQLite
        const deleteQuery = `DELETE FROM recetas WHERE id = ?;`;
        await this.database.executeSql(deleteQuery, [id]);
        console.log('Receta eliminada de SQLite');
      }
    } catch (error) {
      console.error('Error al eliminar la receta:', error);
    }
  }

  private async getJsonIdFromSQLite(id: number): Promise<number | null> {
    if (this.database) {
      const query = `SELECT jsonId FROM recetas WHERE id = ?;`;
      const result = await this.database.executeSql(query, [id]);
      if (result.rows.length > 0) {
        return result.rows.item(0).jsonId;
      }
    }
    return null;
  }
}
