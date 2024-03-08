require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

app.use(cors());

const connection = mysql.createConnection(process.env.DATABASE_URL);

app.get("/", (req, res) => {
  console.log("Project");
  res.send("Hi Project");
});

app.get("/food", (req, res) => {
  connection.query("SELECT * FROM food", function (err, results, fields) {
    res.send(results);
  });
});

app.get("/foodmenu", (req, res) => {
  connection.query(
    "SELECT foodID,foodName,foodDescription,foodPrice,tbl_menu.menuName FROM tbl_food,tbl_menu WHERE tbl_food.MenuID=tbl_menu.MenuID",
    function (err, results, fields) {
      res.send(results);
    }
  );
});

app.get("/menu", (req, res) => {
  connection.query("SELECT * FROM menu", function (err, results, fields) {
    res.send(results);
  });
});

app.post("/addmenu", function (req, res) {
  connection.query(
    "INSERT INTO `menu` VALUES (?, ?)",
    [req.body.menuID, req.body.menuName],

    function (err, results) {
      if (err) throw err;
      return res.send({
        err: false,
        data: results,
        message: "New menu has been created successfully.",
      });
    }
  );
});

app.listen(process.env.PORT || 3333);
