const user_model = require("./user");
const plan_model = require("./plan");
const post_model = require("./post");
const comment_model = require("./comment");

const con = require("../src/connection");
const Sequelize = require("sequelize");

const user = user_model(con.sequelize, Sequelize);
const plan = plan_model(con.sequelize, Sequelize);
const post = post_model(con.sequelize, Sequelize);
const comment = comment_model(con.sequelize, Sequelize);

//plan and user ===> one to many
plan.hasMany(user);
user.belongsTo(plan);

//user and post ===>one to many
user.hasMany(post);
post.belongsTo(user);

//post and comment ===> one to many
post.hasMany(comment);
comment.belongsTo(post);

//user and comment ===> one to many
user.hasMany(comment);
comment.belongsTo(user);

//comment and replys ====> one to many
comment.hasMany(comment, { foreignKey: { name: "reply", allNull: true } });

// const users = await user.findAll();
// console.log("All users:", JSON.stringify(users, null, 2));
con.sequelize.sync({ force: false }).then(() => {
  console.log("Tables Created!");
});

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function plans() {
  await timeout(4000);
  const result = await plan.findAll({ raw: true });
  if (result.length === 0) {
    plan.create({ type: "basic" });
    plan.create({ type: "premium" });
    console.log("plans created");
  } else {
    console.log("plans already created");
  }
}
plans();
module.exports = {
  user,
  plan,
  comment,
  post,
};
