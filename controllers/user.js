
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/signin");
const User = require("../models/user");

// REGISTER USER
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
// SIGN IN USER
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
// GET ALL USERS
const getAllUsers = async (req, res)=>{
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
// SIGN OUT USER
const signOut = (req, res) => {
    res.clearCookie("t");
    res.json({ message: "Success" });
};

// DELETE USER 
const deleteUser = (req, res) => {
  const userId = req.params.id;

  User.findByIdAndRemove(userId)
    .then(() => {
      res.json({ success: true, message: 'User deleted successfully' });
    })
    .catch((err) => {
      res.status(500).json({ success: false, error: err.message });
    });
};

// GET USER BY ID
const getUserById = (req, res) => {
  const userId = req.params.id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.json({ success: true, user });
    })
    .catch((err) => {
      res.status(500).json({ success: false, error: err.message });
    });
};

// UPDATE USER 
const updateUser = (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  User.findByIdAndUpdate(userId, updateData, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.json({ success: true, user });
    })
    .catch((err) => {
      res.status(500).json({ success: false, error: err.message });
    });
};

module.exports = {
  register,
  signIn,
  signOut,
  deleteUser,
  getUserById,
  updateUser,
  getAllUsers
};

