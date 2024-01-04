const router = require('express').Router();
const { register, signIn, signOut } = require('../controllers/user');

// REGISTER
router.post('/users/register', register);

// SIGNIN
router.post('/auth/signin', signIn);

// SIGNOUT
router.post('/auth/signout', signOut);

module.exports = router;

