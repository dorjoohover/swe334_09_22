const { pool } = require("../db");
const tableName = "attrs";
async function getAllProductAttr() {
  const result = await pool.query(`SELECT * FROM ${tableName} `);
  return result.rows;
}
async function getProductAttrById(id) {
  const result = await pool.query(
    `SELECT * FROM ${tableName} where id = ${id} `
  );
  return result.rows?.[0];
}

async function createProductAttr(dto) {
  const { name } = dto;
  const result = await pool.query(
    `INSERT INTO ${tableName} (name) VALUES ($1) RETURNING *`,
    [name]
  );
  return result.rows[0];
}

module.exports = {
  getAllProductAttr,
  createProductAttr,
  getProductAttrById,
};
