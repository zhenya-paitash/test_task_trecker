const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPT_KEY);
const jwtoken = {};
const jwt = require("jsonwebtoken");
const Users = require("../models/user-model");

jwtoken.encrypt = (data) => cryptr.encrypt(data);
jwtoken.decrypt = (data) => cryptr.decrypt(data);

jwtoken.refresh = async (user) => {
  let payload = {
    id:         user.id,
    firstname:  user.firstname,
    lastname:   user.lastname,
    role:       user.role
  };
  let accessToken  = jwt.sign(payload, process.env.ACCESS_SECRET_TOKEN, {expiresIn: "5m"});
  let refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_TOKEN);
  const rft        = jwtoken.encrypt(refreshToken);

  let curUsr       = await Users.findOne({where: {id: user.id}});
  await curUsr.update({rft});

  return accessToken
};


module.exports = jwtoken;