let
  Sequelize     = require("sequelize"),
  db            = require("./config/database"),
  faker         = require("faker"),
  Users         = require("./models/user-model"),
  UserRoles     = require("./models/userrole-model"),
  UserSocials   = require("./models/usersocial-model"),
  Projects      = require("./models/project-model"),
  ProjectUsers  = require("./models/projectuser-model"),
  Tasks         = require("./models/task-model"),
  TaskUsers     = require("./models/taskuser-model"),
  Comments      = require("./models/comment-model");


// ============================ CREATE and FILL in a NEW DATABASE =================================
let create = async function() {
  faker.locale = "en";
  await db.sync({force: true});
  await createUsers();
  await createUserRoles();
  await createProjects();
  await createProjectUsers();
  await createTasks();
  await createTaskUsers();
  await createComments();
  await console.log("\x1b[32m%s\x1b[0m", "DB created!")
};


// Users
async function createUsers() {
  // create 2 manager & 28 developers
  for (let i = 0; i < 30; i++) {
    let role;
    i === 0 || i === 1
      ? role = 1
      : role = 2;

    await Users.create({
      firstname:  faker.name.firstName().toLowerCase(),
      lastname:   faker.name.lastName().toLowerCase(),
      email:      faker.internet.email().toLowerCase(),
      password:   faker.internet.password(),
      role:       role,
      // rft:        faker.internet.password(),
    });

    await UserSocials.create({
      // id_user: i + 1,
      age: Math.floor(18 + Math.random() * 20),
      phone: faker.phone.phoneNumber(),
    })
  }
}


// UserRoles
async function createUserRoles() {
  // manager
  await UserRoles.create({
    rolename: "manager",
    user_search:    true,

    project_create: true,
    project_users:  true,

    task_see:       true,
    task_create:    true,
    task_users:     true,
    task_status:    true,

    comment_create: true,
    comment_edit:   true,
    comment_delete: true
  });

  // developer
  await UserRoles.create({
    rolename: "developer",
    user_search:    false,

    project_create: false,
    project_users:  false,

    task_see:       true,
    task_create:    true,
    task_users:     false,
    task_status:    true,

    comment_create: true,
    comment_edit:   true,
    comment_delete: true
  });
}

// Projects
async function createProjects() {

  // test project # 1
  await Projects.create({
    name:         "SSTRATEGY REALIZATION MODEL",
    description:  "Establish framework, process, and discipline across an organization to accomplish the essential strategic objectives for success\n" +
      "Align finite resources throughout the organization to ensure the most important things get done\n" +
      "Enable visibility to project and portfolio performance to ensure realization of organizational benefits",
    // image:        "https://images.unsplash.com/photo-1533661537256-701c0084511d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1898&q=80",
    deadline:     faker.date.future(),
    category:     "blog",
    author:       1
  });

  // test project # 2
  await Projects.create({
    name:         "PPM/PMO MATURITY ASSESSMENT",
    description:  "Assess current methodologies and tools with a focus on strategy, project management, PPM, and change management practices through a formal assessment process utilizing seven success factors\n" +
      "Evaluate the effectiveness of decision-making, communication, and governance\n" +
      "Prioritize recommendations and provide a sequenced roadmap for increased growth using IPM’s proprietary maturity model",
    // image:        "https://images.unsplash.com/photo-1579461902458-2d7acff3855d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80",
    deadline:     faker.date.future(),
    category:     "company-site",
    author:       1
  });

  // test project # 3
  await Projects.create({
    name:         "PPM ENHANCEMENT/IMPLEMENTATION",
    description:  "Align portfolio projects to strategic goals\n" +
      "Establish/enhance project prioritization and selection process\n" +
      "Develop PPM analysis process, including resource capacity and portfolio balance\n" +
      "Provide portfolio management leadership",
    // image:        "https://images.unsplash.com/photo-1548382340-e7280a94e3ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80",
    deadline:     faker.date.future(),
    category:     "video-hosting",
    author:       2
  });

  // test project # 4
  await Projects.create({
    name:         "PMO ENHANCEMENT/IMPLEMENTATION",
    description:  "Establish/enhance PM processes, tools, templates, and governance\n" +
      "Develop project communication strategies\n" +
      "Provide onsite PMO Director leadership, including management of PM staff",
    // image:        "",
    deadline:     faker.date.future(),
    category:     "landing-page",
    author:       2
  });

  // test project # 5
  await Projects.create({
    name:         "PPM SOFTWARE SELECTION & IMPLEMENTATION",
    description:  "Understand goals and requirements of a new software solution\n" +
      "Provide an objective short-list of market vendors suited for the organization, scored for alignment to needs and maturity\n" +
      "Support the end-to-end implementation of PM/PPM software with project management leadership to ensure maximum adoption and integration with other technology",
    // image:        "thisnoimage",
    deadline:     faker.date.future(),
    category:     "online-shop",
    author:       1
  });
}

// ProjectUsers
async function createProjectUsers() {
  // 5 projects
  for (let i = 0; i < 5; i++) {
    // 7 users in project
    for (let j = 0; j < 7; j++) {
      await ProjectUsers.create({
        id_project:   i + 1,
        id_user:      Math.floor(Math.random() * 28 + 3)
      });
    }
  }
}

// Tasks
async function createTasks() {
  let status = ["waiting", "implementation", "verifyng", "releasing"];
  for (let i = 0; i < 30; i++) {
    await Tasks.create({
      name: faker.commerce.productName(),
      description: faker.lorem.text(),
      status: status[Math.floor(Math.random() * 4)],
      author: Math.ceil(Math.random() * 30),
      // deadline: faker.date.future(),
      id_project: Math.ceil(Math.random() * 5)
    });
  }
}

// TaskUsers
async function createTaskUsers() {
  for (let i = 0; i < 30; i++) {
    for (let j = 0; j < Math.floor(Math.random()*3); j++) {
      await TaskUsers.create({
        id_task:   i + 1,
        id_user:   Math.floor(Math.random() * 28 + 3)
      });
    }
  }
}

// Comments
async function createComments() {
  for (let i = 0; i < 50; i++) {
    await Comments.create({
      author: Math.ceil(Math.random() * 30),
      text: faker.lorem.text(),
      id_task: Math.ceil(Math.random() * 30)
    })
  }
}


module.exports = {create: create};