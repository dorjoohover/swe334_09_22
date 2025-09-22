const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "ufe",
  user: "postgres",
  password: "root",
});
async function connectDB() {
  try {
    const client = await pool.connect();
    console.log("connected");
    client.release();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = { pool, connectDB };
