const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const db = mysql.createConnection({
  host: process.env.REACT_APP_DB,
  port: process.env.REACT_APP_DB_PORT,
  user: process.env.REACT_APP_DB_USER,
  password: process.env.REACT_APP_DB_PW,
  database: process.env.REACT_APP_DB_SCHEMA
});

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads");
    fs.promises.mkdir(uploadPath, { recursive: true })
      .then(() => cb(null, uploadPath))
      .catch(err => cb(err));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

const handleDatabaseError = (res, err, errorMessage) => {
  console.error(`Error ${errorMessage}:`, err);
  res.status(500).json({ error: `Error ${errorMessage}` });
};

app.post("/member", async (req, res) => {
  const { id, pw, email } = req.body;
  const sqlQuery = "INSERT INTO member VALUES (?, ?, ?);";

  try {
    await db.promise().query(sqlQuery, [id, pw, email]);
    res.status(200).json({ message: "Member created successfully" });
  } catch (err) {
    handleDatabaseError(res, err, "new member post");
  }
});

app.post("/login", async (req, res) => {
  const { id, pw } = req.body;
  const sqlQuery = "SELECT COUNT(*) AS 'cnt' FROM member WHERE username = ? AND password = ?;";

  try {
    const [result] = await db.promise().query(sqlQuery, [id, pw]);
    res.status(200).json(result);
  } catch (err) {
    handleDatabaseError(res, err, "login post");
  }
});

app.get("/posts", async (req, res) => {
  const query = "SELECT * FROM board";

  try {
    const [result] = await db.promise().query(query);
    res.status(200).json(result);
  } catch (err) {
    handleDatabaseError(res, err, "fetching board");
  }
});

app.post("/posts", upload.fields([{ name: "images1" }, { name: "images2" }, { name: "images3" }]), async (req, res) => {
  const { title, content } = req.body;
  const images = [
    req.files["images1"] ? req.files["images1"][0].filename : null,
    req.files["images2"] ? req.files["images2"][0].filename : null,
    req.files["images3"] ? req.files["images3"][0].filename : null,
  ];

  const query = "INSERT INTO board (title, content, images1, images2, images3) VALUES (?, ?, ?, ?, ?)";
  try {
    await db.promise().query(query, [title, content, images[0], images[1], images[2]]);
    res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    handleDatabaseError(res, err, "creating post");
  }
});

app.put("/posts/:id", upload.fields([{ name: "images1" }, { name: "images2" }, { name: "images3" }]), async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;

  const selectQuery = "SELECT images1, images2, images3 FROM board WHERE id = ?";
  try {
    const [result] = await db.promise().query(selectQuery, [postId]);
    const images = result[0] || {};
    await Promise.all(Object.values(images).map(deleteImage));
  } catch (err) {
    handleDatabaseError(res, err, "fetching board");
    return;
  }

  const newImages = [
    req.files["images1"] ? req.files["images1"][0].filename : null,
    req.files["images2"] ? req.files["images2"][0].filename : null,
    req.files["images3"] ? req.files["images3"][0].filename : null,
  ];

  const updateQuery = "UPDATE board SET title = ?, content = ?, images1 = ?, images2 = ?, images3 = ? WHERE id = ?";
  try {
    await db.promise().query(updateQuery, [title, content, newImages[0], newImages[1], newImages[2], postId]);
    res.status(200).json({ message: "Post updated successfully" });
  } catch (err) {
    handleDatabaseError(res, err, "updating post");
  }
});

app.delete("/posts/:id", async (req, res) => {
  const postId = req.params.id;

  const selectQuery = "SELECT images1, images2, images3 FROM board WHERE id = ?";
  try {
    const [result] = await db.promise().query(selectQuery, [postId]);
    const images = result[0] || {};
    await Promise.all(Object.values(images).map(deleteImage));
  } catch (err) {
    handleDatabaseError(res, err, "fetching board");
    return;
  }

  const deleteQuery = "DELETE FROM board WHERE id = ?";
  try {
    await db.promise().query(deleteQuery, [postId]);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    handleDatabaseError(res, err, "deleting post");
  }
});

async function deleteImage(fileName) {
  if (fileName) {
    const filePath = path.join(__dirname, "uploads", fileName);
    try {
      await fs.promises.unlink(filePath);
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  }
}

app.listen(process.env.REACT_APP_LOCALHOST_PORT, process.env.REACT_APP_LOCALHOST, () => {
  console.log("server start");
  console.log("server URL: " + process.env.REACT_APP_LOCALHOST);
  console.log("server PORT: " + process.env.REACT_APP_LOCALHOST_PORT);
});
