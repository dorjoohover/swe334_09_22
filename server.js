const express = require("express");
const bodyParser = require('body-parser')
const { connectDB } = require("./db");

const PORT = 5000;

const errorHandler = require("./middleware/error");
const logger = require("./middleware/logger");

const categoriesRoutes = require("./routes/categories");
const authRoutes = require("./routes/auth"); 
const appRoutes = require("./routes/app"); 

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);
app.use(errorHandler);
app.use('/api', appRoutes)
app.use("/api/categories", categoriesRoutes);
app.use("/api/auth", authRoutes);

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
