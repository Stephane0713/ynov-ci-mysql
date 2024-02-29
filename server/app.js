let mysql = require("mysql");

let connection = mysql.createConnection({
  user: "root",
  password: "pwd",
  database: "ynov_ci",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MYSQL !");
});

connection.query("select * from user", function (err, results, fields) {
  if (err) throw err;
  console.log("Nb users: ", results.length);
});

connection.end();
