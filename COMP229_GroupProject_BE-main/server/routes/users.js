const express = require('express');
const router = express.Router();
const { getUsers, getUser, updateUser, deleteUser, getCurrentUser, updateCurrentUser, deleteCurrentUser } = require('../controllers/userController');
const auth = require('../middlewares/auth');

// api for CRUD the current login user, register before all catch all :id routes
router.get('/me', auth, getCurrentUser);
router.put('/me', auth, updateCurrentUser);
router.delete('/me', auth, deleteCurrentUser);

// these should only be accessed by admins
router.get('/', auth, getUsers);
router.get('/:id', auth, getUser);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

module.exports = router;
