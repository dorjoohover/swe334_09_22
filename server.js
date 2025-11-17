const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDB } = require("./db");

const PORT = 5000;

const errorHandler = require("./middleware/error");
const logger = require("./middleware/logger");

const categoriesRoutes = require("./routes/categories");
const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");
const appRoutes = require("./routes/app");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);

app.use("/api", appRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/product", productRoutes);
app.use("/api/auth", authRoutes);
app.get("/error", () => {
  throw new Error("Test error!");
});
app.use(errorHandler);
(async () => {
  await connectDB();
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
