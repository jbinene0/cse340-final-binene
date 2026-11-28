import db from '../db.js';

const emailExists = async (email) => {
  const result = await db.query('SELECT 1 FROM users WHERE email = $1', [email]);
  return result.rowCount > 0;
};

// New accounts always get the standard 'user' role
const createUser = async ({ firstName, lastName, email, passwordHash }) => {
  const sql = `
    INSERT INTO users (first_name, last_name, email, password_hash, role_id)
    VALUES ($1, $2, $3, $4, (SELECT role_id FROM roles WHERE role_name = 'user'))
    RETURNING user_id
  `;
  const result = await db.query(sql, [firstName, lastName, email, passwordHash]);
  return result.rows[0];
};

export { emailExists, createUser };