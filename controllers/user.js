const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/signin');
const User = require('../models/user');

const register = (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: 'Email already exists' });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
};

const signIn = (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ emailnotfound: 'Email not found' });
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                };

                jwt.sign(
                    payload,
                    process.env.SECRET_KEY,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                );
            } else {
                return res.status(400).json({ passwordincorrect: 'Password incorrect' });
            }
        });
    });
};

const signOut = (req, res) => {
    // You don't need to handle sign-out in a stateless JWT system.
    // Clients manage their tokens, and there's no need to explicitly "log out" on the server.
    res.json({ message: 'Sign-out not required in a stateless JWT system.' });
};

module.exports = {
    register,
    signIn,
    signOut
};


// const signOut = (req, res) => {
//     // Get the token from the request headers
//     const token = req.headers.authorization;
  
//     // Check if the token is in the blacklist
//     if (tokenBlacklist.has(token)) {
//       return res.status(401).json({ message: 'Token already invalidated' });
//     }
  
//     // Invalidate the token (add it to the blacklist)
//     tokenBlacklist.add(token);
  
//     res.json({ success: true, message: 'Token invalidated successfully' });
// };


// module.exports = {
//     register,
//     signIn,
//     // signOut
// }