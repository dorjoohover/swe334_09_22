const express = require("express");

// const logger = require("./middleware/logger");
const { connectDB } = require("./db");
// const errorHandler = require("./middleware/error");
const PORT = 5000;
categoriesRoutes = require("./routes/categories.js");

const app = express();

app.use(express.json());
// app.use(logger);
app.use("/api/categories", categoriesRoutes);
// app.use(errorHandler);
(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
