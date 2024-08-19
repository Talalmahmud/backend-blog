const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const userRoute = require("./routes/userRoute");


app.get("/", (req, res) => res.json({ name: "Talal" }));

// Correct the argument order in the route handler
app.use("/api/v1", userRoute);

// 404 Error Handler
app.use((req, res, next) => {
  res.status(404).json({ error: "API route not found" });
});

// 500 Error Handler
app.use((err, req, res, next) => {
  res.status(500).json({ error: "Something went wrong!" });
});

// Consistent port logging
const PORT = 8000;
app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

module.exports = app;
