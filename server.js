const express = require("express");
const { connectDB } = require("./db");

const PORT = 5000;
const categoriesRoutes = require("./routes/categories");
const authRoutes = require("./routes/auth"); // Шинэ auth route

const app = express();

app.use(express.json());

app.use("/api/categories", categoriesRoutes);
app.use("/api/auth", authRoutes);

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
