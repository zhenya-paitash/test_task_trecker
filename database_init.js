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
      // age:        Math.floor(18 + Math.random() * 20),
      // phone:      faker.phone.phoneNumber(),
      password:   faker.internet.password(),
      role:       role
    });

    await UserSocials.create({
      // id_user: i + 1,
      age: Math.floor(18 + Math.random() * 20),
      phone: faker.phone.phoneNumber(),
      // github: {type: Sequelize.STRING},
      // telegram: {type: Sequelize.STRING},
      // vk: {type: Sequelize.STRING},
      // facebook: {type: Sequelize.STRING},
      // gmail: {type: Sequelize.STRING},
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
  let category = [
    "business-card",
    "company-site",
    "online-shop",
    "landing-page",
    "electronic-marketplace",
    "informational-portal",
    "nonprofit-website",
    "blog",
    "social-network",
    "search-system",
    "post-service",
    "theme-site",
    "personal-site",
    "storage-service",
    "video-hosting",
    "bulletin-board",
    "directory-site",
    "online-encyclopedia",
    "other"];

  // test project # 1
  await Projects.create({
    name:         "Secure shy favour length all twenty denote. Steepest speaking up attended it as.",
    description:  "Mrs assured add private married removed believe did she. To sure calm much most long me mean. Mrs assured add private married removed believe did she. To things so denied admire. Whatever throwing we on resolved entrance together graceful. Draw from upon here gone add one. Her too add narrow having wished. Called though excuse length ye needed it he having. Called though excuse length ye needed it he having. Polite do object at passed it is. Fat new smallness few supposing suspicion two. Hard do me sigh with west same lady. Course sir people worthy horses add entire suffer. Polite do object at passed it is. Ecstatic elegance gay but disposed. Sentiments two occasional affronting solicitude travelling and one contrasted. Effect if in up no depend seemed. Equally he minutes my hastily. Draw from upon here gone add one. Ecstatic elegance gay but disposed. Fat new smallness few supposing suspicion two. Mrs assured add private married removed believe did she. Way own uncommonly travelling now acceptance bed compliment solicitude. undefined. undefined. Way own uncommonly travelling now acceptance bed compliment solicitude. Any delicate you how kindness horrible outlived servants. Steepest speaking up attended it as. Is inquiry no he several excited am. So by colonel hearted ferrars. Dissimilar admiration so terminated no in contrasted it. If in so bred at dare rose lose good. At none neat am do over will. Expression alteration entreaties mrs can terminated estimating. Feel and make two real miss use easy. Do play they miss give so up.",
    // image:        "https://images.unsplash.com/photo-1533661537256-701c0084511d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1898&q=80",
    deadline:     faker.date.future(),
    category:     "blog",
    author:       1
  });

  // test project # 2
  await Projects.create({
    name:         "Feel and make two real miss use easy. Words to up style of since world. Polite do object at passed it is. To sure calm much most long me mean.",
    description:  "Estate was tended ten boy nearer seemed. If in so bred at dare rose lose good. As mr started arrival subject by believe. Words to up style of since world. Draw from upon here gone add one. Any delicate you how kindness horrible outlived servants. Latter remark hunted enough vulgar say man. Sentiments two occasional affronting solicitude travelling and one contrasted. An concluded sportsman offending so provision mr education. Feel and make two real miss use easy. Up hung mr we give rest half. Do play they miss give so up. Whatever throwing we on resolved entrance together graceful. Hard do me sigh with west same lady. Agreeable promotion eagerness as we resources household to distrusts. Agreeable promotion eagerness as we resources household to distrusts. Steepest speaking up attended it as. Course sir people worthy horses add entire suffer. Secure shy favour length all twenty denote. Small for ask shade water manor think men begin. Happiness remainder joy but earnestly for off. Am wound worth water he linen at vexed.. Sportsman do offending supported extremity breakfast by listening. Detract yet delight written farther his general. Mirth learn it he given. How one dull get busy dare far. Equally he minutes my hastily. Fat new smallness few supposing suspicion two. Now summer who day looked our behind moment coming. Advantages entreaties mr he apartments do. Strictly numerous outlived kindness whatever on we no on addition. Hard do me sigh with west same lady. He felicity no an at packages answered opinions juvenile. Indulgence contrasted sufficient to unpleasant in in insensible favourable. Sitting hearted on it without me. Able rent long in do we. An concluded sportsman offending so provision mr education. Draw from upon here gone add one. He felicity no an at packages answered opinions juvenile. Able rent long in do we. undefined. Bed uncommonly his discovered for estimating far. Am wound worth water he linen at vexed.. Feel and make two real miss use easy. At none neat am do over will. Effect if in up no depend seemed. You high bed wish help call draw side. Any delicate you how kindness horrible outlived servants. Draw fond rank form nor the day eat. Ecstatic elegance gay but disposed. Took sold add play may none him few. Made neat an on be gave show snug tore. Effect if in up no depend seemed. Course sir people worthy horses add entire suffer. Her too add narrow having wished. Advantages entreaties mr he apartments do. Any delicate you how kindness horrible outlived servants. Strictly numerous outlived kindness whatever on we no on addition. Fortune day out married parties. Effect if in up no depend seemed. Her too add narrow having wished. As so seeing latter he should thirty whence. ",
    // image:        "https://images.unsplash.com/photo-1579461902458-2d7acff3855d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80",
    deadline:     faker.date.future(),
    category:     "company-site",
    author:       1
  });

  // test project # 3
  await Projects.create({
    name:         "Now summer who day looked our behind moment coming. So by colonel hearted ferrars. Whatever throwing we on resolved entrance together graceful.",
    description:  "We leaf to snug on no need. Mrs assured add private married removed believe did she. undefined. Indulgence contrasted sufficient to unpleasant in in insensible favourable. Any delicate you how kindness horrible outlived servants. An stairs as be lovers uneasy. Painful so he an comfort is manners. Limits far yet turned highly repair parish talked six. Hard do me sigh with west same lady. Considered discovered ye sentiments projecting entreaties of melancholy is. Bed uncommonly his discovered for estimating far. Fat new smallness few supposing suspicion two. Draw from upon here gone add one. As so seeing latter he should thirty whence. Indulgence contrasted sufficient to unpleasant in in insensible favourable. Up hung mr we give rest half. Agreeable promotion eagerness as we resources household to distrusts. Small for ask shade water manor think men begin. Pain son rose more park way that. Latter remark hunted enough vulgar say man. Her too add narrow having wished. Limits far yet turned highly repair parish talked six. ",
    // image:        "https://images.unsplash.com/photo-1548382340-e7280a94e3ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80",
    deadline:     faker.date.future(),
    category:     "video-hosting",
    author:       2
  });

  // test project # 4
  await Projects.create({
    name:         "Strictly numerous outlived kindness whatever on we no on addition. If in so bred at dare rose lose good. ",
    description:  "Secure shy favour length all twenty denote. Way own uncommonly travelling now acceptance bed compliment solicitude. He felicity no an at packages answered opinions juvenile. If in so bred at dare rose lose good. Bed uncommonly his discovered for estimating far. Way own uncommonly travelling now acceptance bed compliment solicitude. At principle perfectly by sweetness do. Fortune day out married parties. Steepest speaking up attended it as. Words to up style of since world. Sitting hearted on it without me. Called though excuse length ye needed it he having. Estate was tended ten boy nearer seemed. At none neat am do over will. Ecstatic elegance gay but disposed. ",
    // image:        "",
    deadline:     faker.date.future(),
    category:     "landing-page",
    author:       2
  });

  // test project # 5
  await Projects.create({
    name:         "Advantages entreaties mr he apartments do. Able rent long in do we.",
    description:  "Her too add narrow having wished. Mrs assured add private married removed believe did she. Pain son rose more park way that. Celebrated delightful an especially increasing instrument am. Mirth learn it he given. Their saved linen downs tears son add music. At none neat am do over will. Uncommonly no it announcing melancholy an in. Course sir people worthy horses add entire suffer. At none neat am do over will. He felicity no an at packages answered opinions juvenile. At none neat am do over will. ",
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