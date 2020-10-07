const connection = require("./connection.js");

const getAllData = (callback) => {
  connection.query("select * from users", (err, data) => {
    if (err) throw callback(err);
    console.log({ data });
    callback(null, data);
  });
};

const postData = (user, callback) => {
  let sql = `insert into users(fullname, username, secretinfo, password) values (?,?,?,?) `;
  connection.query(sql, user, (err, data) => {
    if (err) throw callback(err);
    callback(null, data);
  });
};

const login = (callback) => {
  connection.query("select username, password from users", (err, data) => {
    if (err) throw callback(err);
    callback(null, data);
  });
};

const forgetPass = (callback) => {
  connection.query("select username, secretinfo from users", (err, data) => {
    if (err) throw callback(err);
    callback(null, data);
  });
};

const updatePass = (arr, callback) => {
  let sql = `UPDATE users
  SET password = ?,
  WHERE
    secretinfo = ?;`;
  connection.query(sql, arr, (err, data) => {
    if (err) throw err;
    callback(null, data);
  });
};

const deleteUser = (username, callback) => {
  let sql = `DELETE FROM users WHERE username = '${username}'`;
  connection.query(sql, (err, data) => {
    if (err) throw callback(err);
    callback(null, data);
  });
};
module.exports = {
  getAllData,
  postData,
  login,
  forgetPass,
  deleteUser,
  updatePass,
};
