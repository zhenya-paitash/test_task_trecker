// LOCAL DATABASE FOR TEST TASK TRECKER

// USER
// --manager--
// --developer--
// -----------------------------------------------------------------------------------------------
let USER = [
  {
    id: 			1,
    firstname: 		"zhenya",
    surname: 		"paitash",
    email: "one@gmail.com",
    password: 		"123",
    role: 		1,
    createdAt: 	"21.02.2020",
    updatedAt: "",
    age: 26,
    genre: "male",
    phone: "+375 (33) 999 99 99"
  },
  {
    id: 			2,
    firstname: 		"alexey",
    surname: 		"paitash",
    email: "two@gmail.com",
    password: 		"321",
    role: 		2,
    createdAt: 	"24.02.2020",
    updatedAt: "",
    age: 26,
    genre: "male",
    phone: "+375 (33) 999 99 99"
  },
];

// ROLE
let USER_ROLE = [
  {
    id: 1,
    name: "manager",
    create_project: true,
    create_task: true
  },
  {
    id: 2,
    name: "developer",
    create_project: false,
    create_task: true
  },
  {
    id: 3,
    name: "not determined",
    create_project: false,
    create_task: false
  }
];



// -----------------------------------------------------------------------------------------------
// PROJECT
let PROJECT = [
  {
    id: 1,
    name: "Онлайн магазин",
    description: "Test1",
    img: "https://images.unsplash.com/photo-1511891636602-1633aec7a560?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80",
    createdAt: "24.02.2020 14:13",
    deadline: "28.02.2020",
    author: 1,  // id manger'а создавшего проект
    // developer: [1, 2],  // id developer'ов, учавствующих в разработке  // rename УЧАСТНИКИ
  },
  {
    id: 2,
    name: "Форум на коленке",
    description: "Test2",
    img: "https://images.unsplash.com/photo-1510793965583-3cc7f8cca399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80",
    createdAt: "24.02.2020 14:13",
    deadline: "27.02.2020",
    author: 2,
    // developer: [1, 2],
  },
];

let PROJECT_DEV = [
  {
    id_project: 1,
    id_user:    1
  },
  {
    id_project: 1,
    id_user:    2
  },
  {
    id_project: 1,
    id_user:    3
  },
  {
    id_project: 2,
    id_user:    1
  },
  {
    id_project: 2,
    id_user:    4
  }
];



// -----------------------------------------------------------------------------------------------
// TASK
let TASK = [
  {
    id: 1,
    name: "Логирование",
    description: ".... фы.в фы.в ф.ы в.фы .вф.ы в. ф.ы.",
    createdAt: "24.02.2020 14:13",
    deadline: "25.03.2020",
    status: "waiting",
    author: 1,
    // developer: [1, 2],
    PROJECT: 1
  },
  {
    id: 2,
    name: "Создание базы данных",
    description: ".... BD CREATE ...",
    createdAt: "26.02.2020 14:13",
    deadline: "10.03.2020",
    status: "verifyng",
    author: 1,
    // developer: [2],
    PROJECT: 1
  },
];

let TASK_DEV = [
  {
    id_task: 1,
    id_user: 1
  },
  {
    id_task: 1,
    id_user: 3
  },
  {
    id_task: 2,
    id_user: 2
  },
  {
    id_task: 2,
    id_user: 3
  }
];



// -----------------------------------------------------------------------------------------------
//COMMENT
let COMMENT = [
  {
    id: 		1,
    text: 		"Доработаю немного и могу сдавать",
    time: 		"25.02.2020 16:14",
    author: 1,
    TASK: 2
  },
  {
    id: 		2,
    text: 		"Сегодня сделаю",
    time: 		"26.02.2020 11:23",
    author: 2,
    TASK: 2
  },
];



// -----------------------------------------------------------------------------------------------
module.exports = {
  USER,
  USER_ROLE,
  PROJECT,
  TASK,
  COMMENT
};