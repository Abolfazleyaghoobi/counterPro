const {pool} = require("../config/db");

const addUser = async (user) => {
  const {
    fullName,
    topSkill,
    githubUrl,
    linkedinUrl,
    telegramUsername,
    instagramUsername,
    nationalNumber,
  } = user;

  try {
    const [result] = await pool.execute(
      `
      INSERT INTO users (
        full_name,
        top_skill,
        github_url,
        linkedin_url,
        telegram_username,
        instagram_username,
        national_number
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        fullName,
        topSkill,
        githubUrl || null,
        linkedinUrl || null,
        telegramUsername || null,
        instagramUsername || null,
        nationalNumber,
      ]
    );

    const [rows] = await pool.execute(
      `
      SELECT *
      FROM users
      WHERE id = ?
      LIMIT 1
      `,
      [result.insertId]
    );

    return rows[0];
  } catch (error) {
    console.error("Error adding user:", error.message);
    throw error;
  }
};
const findUserByNationalNumber = async (nationalNumber) => {
  try {
    const [rows] = await pool.execute(
      `
      SELECT *
      FROM users
      WHERE national_number = ?
      LIMIT 1
      `,
      [nationalNumber]
    );

    return rows[0] || null;
  } catch (error) {
    console.error("Error finding user by national number:", error);
    throw error;
  }
};

const findUserByIsNotActive = async () => {
  try {
    const [rows] = await pool.execute(
      `
      SELECT *
      FROM users
      WHERE is_active = FALSE
      `
    );

    return rows;
  } catch (error) {
    console.error("Error finding inactive users:", error);
    throw error;
  }
};

const findUserByIsActive = async () => {
  try {
    const [rows] = await pool.execute(
      `
      SELECT COUNT(*) AS count
      FROM users
      WHERE is_active = TRUE
      `
    );

    return rows[0].count;
  } catch (error) {
    console.error("Error counting active users:", error);
    throw error;
  }
};



const activeUser = async (nationalNumber) => {
  try {
    const [result] = await pool.execute(
      `
      UPDATE users
      SET
        is_active = TRUE,
        verification_status = 'verified',
        verified_at = CURRENT_TIMESTAMP
      WHERE
        national_number = ?
        AND is_active = FALSE
        AND verification_status = 'pending'
      `,
      [nationalNumber]
    );

    if (result.affectedRows === 0) {
      return null;
    }

    const [rows] = await pool.execute(
      `
      SELECT *
      FROM users
      WHERE national_number = ?
      LIMIT 1
      `,
      [nationalNumber]
    );

    return rows[0] || null;
  } catch (error) {
    console.error("Error activating user:", error);
    throw error;
  }
};




const rejectUser = async (nationalNumber) => {
  try {
    const [result] = await pool.execute(
      `
      DELETE FROM users
      WHERE national_number = ?
        AND is_active = FALSE
        AND verification_status = 'pending'
      `,
      [nationalNumber]
    );

    if (result.affectedRows === 0) {
      return null;
    }

    return {
      nationalNumber,
      deleted: true,
    };
  } catch (error) {
    console.error("Error rejecting user:", error);
    throw error;
  }
};




const getAllUser = async () => {
  try {
    const [rows] = await pool.execute(
      `
      SELECT *
      FROM users
      WHERE is_active = TRUE
      ORDER BY created_at DESC
      `
    );

    return rows;
  } catch (error) {
    console.error("Error finding active users:", error);
    throw error;
  }
};

const getAllUserForUser=async()=>{
  
  try {
    const [rows] = await pool.execute(
      `
      SELECT
        id,
        full_name,
        top_skill,
        github_url,
        linkedin_url,
        telegram_username,
        instagram_username,
        verification_status,
        is_active,
        likes,
        verified_at,
        created_at,
        updated_at
      FROM users
      WHERE is_active = TRUE
      ORDER BY created_at DESC
      `
    );

    return rows;
  } catch (error) {
    console.error("Error finding active users:", error);
    throw error;
  }

}



const addLikeToUser = async (userId) => {
  try {
    const [result] = await pool.execute(
      `
      UPDATE users
      SET likes = likes + 1
      WHERE id = ?
        AND is_active = TRUE
      `,
      [userId]
    );

    if (result.affectedRows === 0) {
      return null;
    }

    const [rows] = await pool.execute(
      `
      SELECT id, full_name, top_skill, likes
      FROM users
      WHERE id = ?
      LIMIT 1
      `,
      [userId]
    );

    return rows[0] || null;
  } catch (error) {
    console.error("Error adding like:", error);
    throw error;
  }
};
const endLikeToUser = async (userId) => {
  try {
    const [result] = await pool.execute(
      `
      UPDATE users
      SET likes = likes - 1
      WHERE id = ?
        AND is_active = TRUE
      `,
      [userId]
    );

    if (result.affectedRows === 0) {
      return null;
    }

    const [rows] = await pool.execute(
      `
      SELECT id, full_name, top_skill, likes
      FROM users
      WHERE id = ?
      LIMIT 1
      `,
      [userId]
    );

    return rows[0] || null;
  } catch (error) {
    console.error("Error adding like:", error);
    throw error;
  }
};


module.exports = {
  findUserByNationalNumber,
  addUser,
  findUserByIsNotActive,
  findUserByIsActive,
  activeUser,
  rejectUser,
  getAllUser,
  addLikeToUser,
  getAllUserForUser,
  endLikeToUser
};