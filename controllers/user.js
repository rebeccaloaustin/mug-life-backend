const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/signin");
const User = require("../models/user");

const register = (req, res) => {

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
        let role = 0
        if(req.body.role){
            role = req.body.role
        }
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role:role
      });
      newUser
        .save()
        .then((user) => res.json(user))
        .catch((err) => console.log(err));
    }
  });
};

const signIn = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email}, function(err, user) {
    if (err) throw err;
     
    // test a matching password
    user.comparePassword(password, function(err, isMatch) {
        if (err) throw err;
        console.log(password, isMatch); 
        if (isMatch) {
            const payload = {
              id: user._id,
              name: user.name,
              email: user.email,
            };
            jwt.sign(
              payload,
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: 31556926, // 1 year in seconds
              },
              (err, token) => {
                res.cookie("t", token, { expire: new Date() + 31556926})
                res.json({
                  success: true,
                  token: "Bearer " + token,
                });
              }
            );
          }else{
            res.json({
                error: "Password is incorrect"
              });
          }
    });    
});





};

const signOut = (req, res) => {
    res.clearCookie("t");
    res.json({ message: "Success" });
};

module.exports = {
  register,
  signIn,
  signOut,
};

