const auth = require("express").Router();
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const db = require("../database/auth");

const hash = (pass) => bcrypt.hashSync(pass, salt);

auth.post("/addUsers", (req, res) => {
  let data = req.body;
  console.log(data);
  let users = [
    data.fullname,
    data.username,
    hash(data.secretinfo),
    hash(data.password),
  ];
  db.postData(users, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

auth.get("/getUser", (req, res) => {
  db.getAllData((err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

auth.post("/login", (req, res) => {
  console.log("aaa", req.body);
  db.login((err, data) => {
    let person = data;
    if (err) throw err;
    let arr = person.map(
      (element) =>
        req.body.username === element.username &&
        bcrypt.compareSync(req.body.password, element.password)
    );
    res.send(arr.includes(true));
  });
});

auth.post("/forgetPassword", (req, res) => {
  console.log("body", req.body);
  db.forgetPass((err, data) => {
    let person = data;
    if (err) throw err;
    let arr = person.map(
      (element) =>
        req.body.username === element.username &&
        bcrypt.compareSync(req.body.secretinfo, element.secretinfo)
    );
    console.log(arr);
    if (arr.includes(true)) {
      db.updatePass(
        [hash(req.body.newPassword), hash(req.body.secretinfo)],
        (err, data) => {
          console.log("haloum");
          if (err) throw err;
          res.send(data);
        }
      );
    } else {
      res.send("something wrong");
    }
  });
});

auth.post("/deleteuser", (req, res) => {
  db.deleteUser(req.body.username, (err, data) => {
    if (err) throw err;
    res.send(`${req.body.username} removed`);
  });
});

module.exports = auth;
