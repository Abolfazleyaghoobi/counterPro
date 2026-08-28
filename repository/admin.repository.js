const {pool} = require("../config/db");

const findAdminByEmail = async (email) => {
  try {
    const [rows] = await pool.execute(
      `
      SELECT *
      FROM admins
      WHERE email = ?
      LIMIT 1
      `,
      [email.trim().toLowerCase()]
    );

    return rows[0] || null;
  } catch (error) {
    console.error("Error finding admin:", error);
    throw error;
  }
};

module.exports = {
  findAdminByEmail,
};