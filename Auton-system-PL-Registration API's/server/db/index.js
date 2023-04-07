// const { resolve } = require("@angular/compiler-cli");

const mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mysql@123",
  database: "mydatabase",
  connectionLimit: 10,
  port: 3306,
});
let rootdb = {};

rootdb.usersList = () => {
  return new Promise((resolve, reject) => {
    pool.query(`select * from usersAPi`, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

rootdb.CreateUsers = (input) => {
  var sql = `
  INSERT INTO usersAPi(first_name, last_name, email, phone_number, organization_name, organization_address, password)
  VALUES (?,?,?,?,?,?,?);
`;
  console.log(input);
  return new Promise((resolve, reject) => {
    pool.query(
      sql,
      [
        input.first_name,
        input.last_name,
        input.email,
        input.phone_number,
        input.organization_name,
        input.organization_address,
        input.password,
      ],

      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(true);
      }
    );
  });
};

module.exports = rootdb;
