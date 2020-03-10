let faker = require("faker");
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


let arr = [
  {
    id_project: 1,
    id_user: 1
  },
  {
    id_project: 1,
    id_user: 2
  },
  {
    id_project: 2,
    id_user: 3
  },
  {
    id_project: 2,
    id_user: 4
  },
];

let res = arr.find(i => i.id_user === 3);
console.log(res.id_user);