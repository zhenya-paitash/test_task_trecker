const
  jwtoken = {},
  Cryptr  = require('cryptr'),
  cryptr  = new Cryptr(process.env.CRYPT_KEY),
  jwt     = require("jsonwebtoken"),
  Users   = require("../models/user-model");


jwtoken.encrypt = (data) => cryptr.encrypt(data);
jwtoken.decrypt = (data) => cryptr.decrypt(data);

jwtoken.refresh = async (user) => {
  let payload = {
    id:         user.id,
    firstname:  user.firstname,
    lastname:   user.lastname,
    role:       user.role
  };
  const accessToken  = jwt.sign(payload, process.env.ACCESS_SECRET_TOKEN, {expiresIn: "5m"});
  const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_TOKEN, {expiresIn: "10m"});
  const rft          = jwtoken.encrypt(refreshToken);

  let curUsr = await Users.findOne({where: {id: user.id}});
  await curUsr.update({rft});

  return accessToken
};


module.exports = jwtoken;