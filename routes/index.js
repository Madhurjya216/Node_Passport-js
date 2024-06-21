var express = require("express");
var router = express.Router();
var express = require("express");
var router = express.Router();
const MyData = require("./users");
const passport = require("passport");
const passportLocal = require("passport-local");

passport.use(new passportLocal(MyData.authenticate()));

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index");
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.get("/profile", isLoggedIn, function (req, res) {
  res.render("profile");
});

router.post("/register", function (req, res) {
  // const tee = MyData.findOne({username: req.body.username})

  // if(tee) return res.send('user already exist!')

  const data = new MyData({
    username: req.body.username,
    secret: req.body.secret,
  });

  MyData.register(data, req.body.password).then(function (registerdUser) {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
  }),
  function (req, res) {}
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;
