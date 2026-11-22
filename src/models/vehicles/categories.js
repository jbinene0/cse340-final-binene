import db from '../db.js';

const getAllCategories = async () => {
  const result = await db.query('SELECT category_id, name FROM categories ORDER BY name');
  return result.rows;
};

// Case-insensitive lookup so /category/trucks matches "Trucks"
const getCategoryByName = async (name) => {
  const sql = 'SELECT category_id, name FROM categories WHERE LOWER(name) = LOWER($1)';
  const result = await db.query(sql, [name]);
  return result.rows[0];
};

export { getAllCategories, getCategoryByName };