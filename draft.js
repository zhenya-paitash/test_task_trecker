// let faker = require("faker");
// let x;
//
// console.log(x);
//
// x ? console.log(1)
//   : console.log(2)
// ;
// faker.locale = "en";
// console.log(faker.phone.phoneNumber());
// console.log(faker.random.number(55));
//
//
// console.log(Math.floor(18 + Math.random() * 37));
// console.log(Math.floor(Math.random() * 4));

// console.log(String(1_000_000 + 1).slice(1,));

// let dstr = new Date("Thu Mar 19 2020 15:29:20 GMT+0300 (GMT+03:00)");
//
// console.log(`${dstr.getDate()}.${dstr.getMonth()}.${dstr.getFullYear()}`);



// let res;
// [1,2,3,4,5,6,7,8,9,10].forEach(i => {if (i % 5 === 0) {res = i; return res}});
// [1,2,3,4,5,6,7,8,9,10].some(i => {if (i % 5 === 0) {return res =i}});

// console.log(res);

// let developers = [];
// let id = [
//   {
//     id_project: 1,
//     id_user: 1
//   },
//   {
//     id_project: 1,
//     id_user: 2
//   },
//   {
//     id_project: 2,
//     id_user: 3
//   },
//   {
//     id_project: 2,
//     id_user: 4
//   },
// ];
//
// id.some(i => {
//   if (i.id_project === 1) {
//     developers.push(i)
//   }
// });
//
// console.log(developers);

// let x = [1,3,5,7,9];
//
// for (let i =0; i<20;i++){
//   x.indexOf(i) !== -1 ? console.log(`${i} ЕСТЬ в х`) : console.log("===");
// }


// console.log(faker.commerce.productName());


// let arr = [
//   {
//     id_project: 1,
//     id_user: 1
//   },
//   {
//     id_project: 1,
//     id_user: 2
//   },
//   {
//     id_project: 2,
//     id_user: 3
//   },
//   {
//     id_project: 2,
//     id_user: 4
//   },
// ];
//
// let res = arr.find(i => i.id_user === 4);
// console.log(res);
//
// res ? console.log("+") : console.log("-");
//
//
//
// let cat;
// if (1+1===2) {cat = "hello"}
//
// console.log(cat);

// for (let i = 0; i < 1_000; i++ ) {
//   let x = Math.floor(Math.random() * 28 + 3);
//   x === 30 ? console.log( x ) : false ;
// }


// let x = "1";
// let y = "2";
// x.equals(y);

// .. ограничение даты текущей для инпут дедлайн
// "18-12-31";
// console.log(new Date().toLocaleDateString()); // формат не верен - вместо -03- выдаёт -3-
// let D = new Date();
// console.log(D.);

// let moment = require("moment");
//
// console.log(moment().format("YYYY-MM-DD"));
// console.log(moment().add(1,'days').format("YYYY-MM-DD"));

// let x = [
//   {
//     id_project:1,
//     id_user: 31
//   },
//   {
//     id_project:1,
//     id_user: 35
//   }
// ];
// let dev = [];
// // x.forEach(i => dev.push(i.id_user));
// dev = x.filter(i => i.id_user);
// console.log(dev);

// let x = ' ';
//
// if (x) console.log("yes");

// let bcrypt = require("bcrypt");
//
// async function hello(password) {
//   let salt      = await bcrypt.genSalt(10);
//   let hashPass  = await bcrypt.hash(password, salt);
//   console.log(hashPass);
// }
//
// let x = "$2b$10$C/X3f3BdPWIPQCDbIzSsIuntMP4Ym75qOZVvGXBcSruFgk0z.9DPm";
// let y = "$2b$10$IgY55jKEhOWPoMCaGXtR2u/qLnu9ASnJSHkf0dYoHzH.tLyBXUMza";
// console.log(x);
// console.log(y);
//
// async function decode(a, b) {
//   let x = await bcrypt.compare(a, "hello");
//   let y = await bcrypt.compare(b, "hello");
//   console.log(x);
//   console.log(y);
//
// }
//
// decode(x, y);

// let crypto = require("crypto");
// //
// // let text = "hello world";
// //
// // console.log(crypto);


// const crypto = require('crypto');
// const algorithm = 'aes-256-cbc';
// const key = crypto.randomBytes(32);
// const iv = crypto.randomBytes(16);
// console.log(key)
// console.log(iv)
//
// function encrypt(text) {
//   let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
//   let encrypted = cipher.update(text);
//   encrypted = Buffer.concat([encrypted, cipher.final()]);
//   return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
// }
//
// function decrypt(text) {
//   let iv = Buffer.from(text.iv, 'hex');
//   let encryptedText = Buffer.from(text.encryptedData, 'hex');
//   let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
//   let decrypted = decipher.update(encryptedText);
//   decrypted = Buffer.concat([decrypted, decipher.final()]);
//   return decrypted.toString();
// }
//
// var hw = encrypt("hello world")
// console.log(hw)
// // let hw = {
// //   iv: 'ab0eb45836fc109ca4d427d5884c3657',
// //   encryptedData: '7d6d0f2b6e22f3dbb9bdd4367b9ac94d'
// // };
// console.log(decrypt(hw))





// console.log(SHA256("Message"));
// function encrypt(data) {
//   return CryptoJS.
// }

// function decrypt(data) {
//   return CryptoJS.AES.decrypt(data, CRYPT_KEY).toString(CryptoJS.enc.Utf8)
// }

// console.log(encrypt("hello"));





// const CryptoJS = require("crypto-js");
// // const RC4 = require("crypto-js/de");
//
// function f1(data) {
//   return CryptoJS.DES.encrypt(data, "Secret Passphrase").toString();
// }
// function f2(data) {
//   return CryptoJS.DES.decrypt(data, "Secret Passphrase").toString(CryptoJS.enc.Utf8);
// }
//
// let hw = f1("hello");
// console.log(hw);
//
//
// console.log(f2(hw));


// let x = '1231212421';
// console.log(x.split('"')[1]);


// const Cryptr = require('cryptr');
// const cryptr = new Cryptr('myTotalySecretKey');
//
// const encryptedString = cryptr.encrypt('"U2FsdGVkX1/NPp6PdjL8HVK8Wm6a4iZ4UdJxmEUb8OJH9uqjFG3Sc5gDZkxZnILh2Zj2zyyP7Hthuykvcd5CFXt/V7dJMhDamPK74PKlD9sOt8PDtmlAuIjformLMSSgOxTpzKiiCm1RgfDbISM7tbLsednbsVyl3As7R9o5eLwwdHkol46VjQUJzbordssjuyq30t5HyB54s3LzJhLqLaRc1yRTu/WflhExGSI1sHbuOfmank34mw2OYqawXAFl/2eD2KqY475hIl6DcND5KgsP3KhwY9JqvXr42VkKlFKYESoVVBAkgfMOExCFNA95W3vH883gQdG/z9iTL8VoVKuPwqqiBO9CuBAN5UBfuAGvlhnikztQQG6dpLbReh44ipdX4069rBhSsRkG8cYPH/XJlhYrmTz9lnCLV8u1ZmznTI8W8ZkuYthUCvdllwjS4NtlctkXughhjrwxCLSC6w=="');
// const decryptedString = cryptr.decrypt(encryptedString);
//
// console.log(encryptedString);
// console.log(decryptedString);
