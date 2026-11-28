import db from '../db.js';

const saveContactMessage = async ({ name, email, subject, message }) => {
  const sql = `
    INSERT INTO contact_messages (name, email, subject, message)
    VALUES ($1, $2, $3, $4)
  `;
  await db.query(sql, [name, email, subject, message]);
};

export { saveContactMessage };