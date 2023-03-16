const bcrypt = require("bcrypt");
const session = require("express-session");
const { user } = require("../models/relationships");
const { post } = require("../models/relationships");
const { comment } = require("../models/relationships");

const home = async (req, res) => {
  const blogs = await post.findAll({
    raw: true,
    attributes: [
      "post.id",
      "post.describtion",
      "post.category",
      "post.photo",
      "user.username",
    ],
    include: [user],
  });
  if (req.session.user) {
    return res.render("visitor/home", {
      title: "home",
      user: req.session.user,
      id: req.session.userid,
      pic: req.session.userpic,
      blogs: blogs,
    });
  } else {
    return res.render("visitor/home", {
      title: "home",
      blogs: blogs,
    });
  }
};

const sign_up = (req, res) => {
  return res.render("visitor/signup", { title: "sign_up" });
};

const sign_up_post = async (req, res) => {
  console.log(req.body);
  req.body.photo = req.file.originalname;
  console.log(req.body);
  const result = await user.findAll({
    raw: true,
    where: {
      email: req.body.email,
    },
  });
  console.log(result.length);
  if (result.length === 0) {
    bcrypt.genSalt(10, function (err, Salt) {
      // The bcrypt is used for encrypting password.
      bcrypt.hash(req.body.password, Salt, async function (err, hash) {
        if (err) {
          throw err;
        }
        hashedPassword = hash;
        req.body.password = hashedPassword;
        req.body.planId = 1;
        const add = await user.create(req.body);
        return res.redirect("/sign_in");
      });
    });
  } else {
    return res.render("visitor/signup", { title: "sign_up", exp: "q" });
  }
};

const sign_in = async (req, res) => {
  return res.render("visitor/signin");
};

const sign_in_post = async (req, res) => {
  const result = await user.findAll({
    raw: true,
    where: {
      email: req.body.email,
    },
  });
  console.log();
  if (result.length === 0) {
    return res.render("visitor/signin", { label: "sign in", exp1: "q" });
  } else {
    console.log(result.length);
    console.log(result[0]);
    bcrypt.genSalt(10, async function (err, Salt) {
      bcrypt.compare(
        req.body.password,
        result[0].password,
        async function (err, isMatch) {
          // Comparing the original password to
          // encrypted password
          if (isMatch) {
            if (req.body.email === "admin@gmail.com") {
              req.session.user = "admin";
              console.log(result[0].id);
              req.session.userid = result[0].id;
              req.session.userpic = result[0].photo;
              req.session.username = result[0].username;
            } else if (result[0].planId === 1) {
              req.session.user = "Basic";
              req.session.userid = result[0].id;
              req.session.username = result[0].username;
              req.session.userpic = result[0].photo;
            } else if (result[0].planId === 2) {
              req.session.user = "Premium";
              req.session.userid = result[0].id;
              req.session.username = result[0].username;
              req.session.userpic = result[0].photo;
            }

            return res.redirect("/");
          }

          if (!isMatch) {
            return res.render("visitor/signin", {
              label: "sign in",
              exp: "please enter the correct password",
            });
          }
        }
      );
    });
  }
};

const sign_out = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

const one_post = async (req, res) => {
  const result = await post.findAll({
    raw: true,
    attributes: [
      "post.id",
      "post.describtion",
      "post.details",
      "post.category",
      "post.photo",
      "user.username",
      "post.createdAt",
    ],
    where: {
      id: req.query.post,
    },

    include: [user],
  });
  const comments = await post.findAll({
    raw: true,
    where: {
      id: req.query.post,
    },
    attributes: [
      "post.id",
      "comments.details",
      "comments.user.photo",
      "comments.createdAt",
      "comments.id",
      "comments.user.username",
    ],
    include: [
      {
        model: comment,
        include: [user],
      },
    ],
  });
  var year = result[0].createdAt.getFullYear();
  var day = result[0].createdAt.getDay();
  var month = result[0].createdAt.getMonth();

  if (req.session.user) {
    res.render("visitor/one_post", {
      title: "post",
      post: result[0],
      day: day,
      month: month,
      year: year,
      user: req.session.user,
      pic: req.session.userpic,
      from: req.session.userid,
      username: req.session.username,
      comments: comments,
    });
  } else {
    res.render("visitor/one_post", {
      title: "post",
      post: result[0],
      day: day,
      month: month,
      year: year,
      comments: comments,
    });
  }
};
module.exports = {
  home,
  sign_up,
  sign_in,
  sign_up_post,
  sign_in_post,
  sign_out,
  one_post,
};
