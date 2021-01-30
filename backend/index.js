const express = require("express");
const app = express();
const cors = require("cors");
const uploadRoutes = require('./routes/upload');

app.use(cors());
app.use("/upload", uploadRoutes);
app.listen(5000, () => {
  console.log("Listen on port 5000");
});
