const bcrypt = require("bcrypt");
const session = require("express-session");
const { user } = require("../models/relationships");
const { post } = require("../models/relationships");
const { Op } = require("sequelize");

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const posts = async (req, res) => {
  return res.render("user/post", {
    title: "add post",
    user: req.session.user,
    pic: req.session.userpic,
  });
};
const add_post = async (req, res) => {
  var date = new Date();
  req.body.year = date.getFullYear();
  req.body.month = date.getMonth();
  req.body.photo = req.file.originalname;
  req.body.userId = req.session.userid;

  if (req.session.user === "admin") {
    const add = await post.create(req.body);
    res.render("user/post", {
      title: "add post",
      user: req.session.user,
      pic: req.session.userpic,
      exp: "successfully added",
    });
  } else if (req.session.user === "Premium") {
    const counter = await post.findAll({
      raw: true,
      include: [user],
      attributes: [[sequelize.fn("COUNT", sequelize.col("post.id")), "count"]],
      where: {
        [Op.and]: [
          { userId: req.session.userid },
          { year: req.body.year },
          { month: req.body.month },
        ],
      },
    });
    console.log(counter[0].count);
    if (counter[0].count >= 2) {
      res.render("user/post", {
        title: "add post",
        user: req.session.user,
        pic: req.session.userpic,
        exp: "you have already post two times this month",
      });
    } else {
      const add = await post.create(req.body);
      res.render("user/post", {
        title: "add post",
        user: req.session.user,
        pic: req.session.userpic,
        exp: "successfully added",
      });
    }
  }
};

const setting = async (req, res) => {
  await timeout(100);
  const result = await user.findAll({
    raw: true,
    where: {
      id: req.session.userid,
    },
  });
  return res.render("user/setting", {
    title: "setting",
    user: req.session.user,
    username: result[0].username,
    phone: result[0].phone,
    pic: result[0].photo,
  });
};

const setting_post = async (req, res) => {
  console.log(req.session.userid);
  await user.update(
    {
      photo: req.file.originalname,
    },
    {
      where: { id: req.session.userid },
    }
  );
  req.session.userpic = req.file.originalname;
  return res.redirect("/users/setting");
};
const setting_post_2 = async (req, res) => {
  bcrypt.genSalt(10, function (err, Salt) {
    // The bcrypt is used for encrypting password.
    bcrypt.hash(req.body.password, Salt, async function (err, hash) {
      if (err) {
        throw err;
      }
      await user.update(
        {
          username: req.body.name,
          password: hash,
          phone: req.body.phone,
        },
        {
          where: { id: req.session.userid },
        }
      );
    });
  });
  return res.redirect("/users/setting");
};

module.exports = {
  posts,
  add_post,
  setting,
  setting_post,
  setting_post_2,
};
