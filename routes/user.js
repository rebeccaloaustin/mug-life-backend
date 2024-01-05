const router = require('express').Router();
const { register, signIn, signOut, deleteUser, getUserById, updateUser, getAllUsers } = require('../controllers/user');

// GET USER BY ID
router.get('/users', getAllUsers);
// GET USER BY ID
router.get('/users/:id', getUserById);

// REGISTER
router.post('/users/register', register);

// SIGNIN
router.post('/auth/signin', signIn);

// SIGNOUT
router.post('/auth/signout', signOut);

// DELETE USER
router.delete('/users/:id', deleteUser);

// GET USER BY ID
router.get('/users/:id', getUserById);

// UPDATE USER
router.put('/users/:id', updateUser);


module.exports = router;


// const router = require('express').Router()
// // const { users } = require('../controllers')
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// require('dotenv').config();
// // Load input validation
// const validateRegisterInput = require("../validation/register");
// const validateLoginInput = require("../validation/signin");
// // Load User model
// const User = require("../models/user");

// // SIGNIN
// router.post("/signin", (req, res) => {
//     console.log("Reached /signin route handler");
//     // Form validation
//     const { errors, isValid } = validateLoginInput(req.body);
//     // Check validation
//     if (!isValid) {
//         return res.status(400).json(errors);
//     }
//     const email = req.body.email;
//     const password = req.body.password;
//     // Find user by email
//     User.findOne({ email }).then(user => {
//     // Check if user exists
//     if (!user) {
//         return res.status(404).json({ emailnotfound: "Email not found" });
//     }   
//     // Check password
//     bcrypt.compare(password, user.password).then(isMatch => {
//         if (isMatch) {
//             // User matched
//             // Create JWT Payload
//             const payload = {
//             id: user.id,
//             // name: user.name
//             };
//             // Sign token
//             jwt.sign(
//                 payload,
//                 process.env.SECRET_KEY,
//                     {
//                         expiresIn: 31556926 // 1 year in seconds
//                     },
//                     (err, token) => {
//                         res.json({
//                             success: true,
//                             token: "Bearer " + token
//                         });
//                     }
//             );
//         } else {
//             return res
//                 .status(400)
//                 .json({ passwordincorrect: "Password incorrect" });
//             }
//         });
//     });
// });

// // REGISTER
// router.post("/register", (req, res) => {
//     console.log("Reached /register route handler");
//     // Form validation
//     const { errors, isValid } = validateRegisterInput(req.body);
//     // Check validation
//     if (!isValid) {
//         return res.status(400).json(errors);
//     }
//     User.findOne({ email: req.body.email }).then(user => {
//         if (user) {
//             return res.status(400).json({ email: "Email already exists" });
//         } else {
//             const newUser = new User({
//             name: req.body.name,
//             email: req.body.email,
//             password: req.body.password
//         });
//     // Hash password before saving in database
//         bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(newUser.password, salt, (err, hash) => {
//                 if (err) throw err;
//                 newUser.password = hash;
//                 newUser
//                     .save()
//                     .then(user => res.json(user))
//                     .catch(err => console.log(err));
//                 });
//             });
//         }
//     });
// });


// module.exports = router;