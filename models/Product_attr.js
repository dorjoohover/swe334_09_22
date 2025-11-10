const { pool } = require("../db");
const tableName = "product_attributes";
async function getAllProductAttr() {
  const result = await pool.query(`SELECT * FROM ${tableName} `);
  return result.rows;
}
async function getProductAttrById(id) {
  const result = await pool.query(
    `SELECT * FROM ${tableName} p where product_id = ${id} `
  );
  console.log(result.rows)
  return result.rows;
}

async function createProductAttr(dto) {
  const { product_id, values, attr_id, value_id } = dto;
  const result = await pool.query(
    `INSERT INTO ${tableName} (product_id, value_id, values, attr_id) VALUES ($1, $2, $3, $4) RETURNING *`,
    [product_id, value_id, values, attr_id]
  );
  return result.rows[0];
}

module.exports = {
  getAllProductAttr,
  createProductAttr,
  getProductAttrById,
};
