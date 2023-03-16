const session = require("express-session");
const { plan } = require("../models/relationships");
const { user } = require("../models/relationships");
const { post } = require("../models/relationships");
const { Op } = require("sequelize");

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const subscribe = async (req, res) => {
  return res.render("user/plan", {
    title: "subscribtion",
    user: req.session.user,
    pic: req.session.userpic,
  });
};
const buy = async (req, res) => {
  console.log(req.query.plan);
  console.log(req.session.userid);
  await user.update(
    {
      planId: req.query.plan,
    },
    {
      where: { id: req.session.userid },
    }
  );
  req.session.user = "Premium";
  res.redirect("/");
};

const search = async (req, res) => {
  const blogs = await post.findAll({
    raw: true,
    where: {
      category: req.query.cat,
    },
  });
  if (req.session.user) {
    return res.render("visitor/home", {
      title: req.query.cat,
      user: req.session.user,
      id: req.session.userid,
      pic: req.session.userpic,
      blogs: blogs,
      cat: "a",
    });
  } else {
    return res.render("visitor/home", {
      title: req.query.cat,
      blogs: blogs,
      cat: "a",
    });
  }
};

const status = async (req, res) => {
  const users = await user.findAll({
    raw: true,
    attributes: [[sequelize.fn("COUNT", sequelize.col("id")), "users"]],
  });
  const posts = await post.findAll({
    raw: true,
    attributes: [[sequelize.fn("COUNT", sequelize.col("id")), "posts"]],
  });
  return res.render("user/status", {
    title: "status",
    user: req.session.user,
    pic: req.session.userpic,
    users: users[0].users,
    posts: posts[0].posts,
  });
};
const remove = async (req, res) => {
  post.destroy({
    where: {
      id: req.query.post,
    },
  });
  res.redirect("/");
};

const all = async (req, res) => {
  await timeout(100);
  const users = await user.findAll({
    raw: true,
    where: {
      email: {
        [Op.ne]: "admin@gmail.com",
      },
    },
  });
  console.log(users);
  res.render("user/allusers", {
    title: "All Users",
    user: req.session.user,
    pic: req.session.userpic,
    users: users,
  });
};
const deletes = async (req, res) => {
  user.destroy({
    where: {
      id: req.query.user,
    },
  });

  res.redirect("/operation/all");
};

module.exports = {
  subscribe,
  buy,
  search,
  status,
  remove,
  all,
  deletes,
};
