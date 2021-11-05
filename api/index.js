const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  password: "Su12mmer",
  database: "fsa-dogs",
});

client.connect();

const express = require("express");
const cors = require("cors");
const multer = require("multer");

const upload = multer({ dest: "public/images" });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/dogs", upload.single("image"), async (req, res) => {
  const response = await client.query(
    `
    INSERT INTO dogs (name, image) VALUES ($1, $2)
    RETURNING *;
    `,
    [req.body.name, req.file.filename]
  );
  res.send({ data: response.rows[0] });
});

app.get("/dogs", async (req, res) => {
  const response = await client.query(`
    SELECT * FROM dogs;
    `);
  res.send({ data: response.rows });
});

app.listen(4000, () => {
  console.log("Server is up!");
});
