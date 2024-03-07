const mysql = require("mysql2");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

dotenv.config({ path: __dirname + `/.env` });

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
  })
  .promise();

/**
 * @description Get All users
 * @route GET /users
 */
const getAllUsers = [
  async function (req, res, next) {
    const sql = "select * from user";
    const [rows] = await pool.query(sql);
    if (!rows.length)
      return res.status(204).json({ message: "Aucun utilisateur" });
    return res.status(200).json({ users: rows });
  },
];

const router = express.Router();

router.route("/").get(getAllUsers);

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: "http://localhost:3000",
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/users", router);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
