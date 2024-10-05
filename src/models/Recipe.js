import { pool } from '../config/db.js';

class Recipe {
  // Récupérer une recette par son ID
  static async getRecipeById(id) {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM recipes WHERE id = $1', [id]);
      return result.rows.length > 0 ? result.rows[0] : null;
    } finally {
      client.release();
    }
  }

  // Récupérer toutes les recettes
  static async getRecipes() {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM recipes');
      return result.rows;
    } finally {
      client.release();
    }
  }

  // Créer une nouvelle recette
  static async createRecipe(title, type, ingredients) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'INSERT INTO recipes (title, type, ingredients) VALUES ($1, $2, $3) RETURNING id',
        [title, type, ingredients],
      );
      return result.rows[0].id;
    } finally {
      client.release();
    }
  }

  // Mettre à jour une recette par son ID
  static async updateRecipe(id, title, ingredients, type) {
    const client = await pool.connect();
    try {
      await client.query(
        'UPDATE recipes SET title = $1, type = $2, ingredients = $3 WHERE id = $4',
        [title, type, ingredients, id],
      );
      return true;
    } finally {
      client.release();
    }
  }

  // Supprimer une recette par son ID
  static async destroyRecipe(id) {
    const client = await pool.connect();
    try {
      await client.query('DELETE FROM recipes WHERE id = $1', [id]);
      return true;
    } finally {
      client.release();
    }
  }

  // Vérifier l'existence d'une recette par titre
  static async checkRecipe(title) {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT COUNT(*) as count FROM recipes WHERE title = $1', [title]);
      return parseInt(result.rows[0].count, 10); // PostgreSQL retourne les COUNTs sous forme de chaîne
    } finally {
      client.release();
    }
  }

  // Vérifier l'existence d'une recette par ID
  static async existsById(id) {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT COUNT(*) as count FROM recipes WHERE id = $1', [id]);
      return parseInt(result.rows[0].count, 10);
    } finally {
      client.release();
    }
  }
}

export { Recipe };
