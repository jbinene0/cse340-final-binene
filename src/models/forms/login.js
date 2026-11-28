import db from '../db.js';

const getUserByEmail = async (email) => {
  const sql = `
    SELECT u.user_id, u.first_name, u.email, u.password_hash, r.role_name
    FROM users u
    JOIN roles r ON u.role_id = r.role_id
    WHERE u.email = $1
  `;
  const result = await db.query(sql, [email]);
  return result.rows[0];
};

export { getUserByEmail };