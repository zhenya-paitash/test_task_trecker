const
  assert      = require("chai").assert,
  validator   = require("validator"),
  Users       = require("../models/user-model"),
  indexRouter = require("../routes/index-router");


//1. тестируемый модуль
describe("USER", () => {
  //2. сценарий
  describe("проверка правильности ввода данных нового пользователя", () => {

    let users = [{
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      role: ""
    },{
      firstname: 1,
      lastname: 22,
      email: 333,
      password: 444,
      role: "555"
    },{
      firstname: "aa",
      lastname: "aa",
      email: "aa",
      password: "aa",
      role: "aa"
    },{
      firstname: "sss",
      lastname: "sss",
      email: "sss@gmail.com",
      password: "sss",
      role: 55
    },{
      firstname: "asd",
      lastname: "ASD",
      email: "asd@asd.com",
      password: "asdASD123",
      role: 1
    }];

    // 3. то, чего ждут от теста
    it("некорректные данные должны фильтроваться", () => {
      // let firstname = db[0].firstname !== "" && db[0].firstname !== " " && db[0].firstname.length > 3;
      // let lastname  = db[0].lastname !== "" && db[0].lastname !== " " && db[0].lastname.length > 3;
      // assert.equal(firstname, true);
      // assert.equal(lastname, true);
      // assert.equal(validator.isEmail(db[0].email), true);
      // assert.equal(validator.isEmpty(db[0].password), false);
      let
        emlpattern = /[a-z0-9]+([-+._][a-z0-9]+){0,2}@.*?(\.(a(?:[cdefgilmnoqrstuwxz]|ero|(?:rp|si)a)|b(?:[abdefghijmnorstvwyz]iz)|c(?:[acdfghiklmnoruvxyz]|at|o(?:m|op))|d[ejkmoz]|e(?:[ceghrstu]|du)|f[ijkmor]|g(?:[abdefghilmnpqrstuwy]|ov)|h[kmnrtu]|i(?:[delmnoqrst]|n(?:fo|t))|j(?:[emop]|obs)|k[eghimnprwyz]|l[abcikrstuvy]|m(?:[acdeghklmnopqrstuvwxyz]|il|obi|useum)|n(?:[acefgilopruz]|ame|et)|o(?:m|rg)|p(?:[aefghklmnrstwy]|ro)|qa|r[eosuw]|s[abcdeghijklmnortuvyz]|t(?:[cdfghjklmnoprtvwz]|(?:rav)?el)|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw])\b){1,2}/,
        paspattern = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*/;

      users.forEach(i => {
        errors = [];
        if (!validator.matches(i.email, emlpattern)) {
          errors.push(i.email)
        }
        if (!validator.matches(i.password, paspattern)) {
          errors.push(i.password)
        }
        if (!validator.isInt(i.role)) {
          errors.push(i.role)
        }

        console.log(errors);
      });

    });

  });
});