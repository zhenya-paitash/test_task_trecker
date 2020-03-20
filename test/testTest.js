const
  assert      = require("chai").assert,
  validator   = require("validator"),
  app         = require("../app"),
  Users       = require("../models/user-model"),
  indexRouter = require("../routes/index-router");


//1. тестируемый модуль
describe("USER", () => {
  //2. сценарий
  describe("проверка правильности ввода данных нового пользователя", () => {
    // 3. то, чего ждут от теста
    it("некорректные данные должны фильтроваться", async t => {
      await app.get("/login", (req, res, done) => {
        console.log(res);
        done();
        assert.equal(res.status, 200);
      });
    });
  });
});