const express = require("express");
const app = express();

app.get("/", (req, res) => res.json({ name: "Talal" }));

app.listen(5000, () => console.log("Server ready on port 3000."));

module.exports = app;
