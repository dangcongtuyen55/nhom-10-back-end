const express = require('express');

const User = require('../app/models/User');

const {login, register, getCurrentUser,getAllUsers,updateUser,deleteUser, blockUser, unBlockUser} = require('../app/controllers/userController');
const { checkCurrentUser } = require('../app/middlewares/checkCurrentUser');

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/getallusers').get(getAllUsers);
router.route('/block/:userId').patch(blockUser);
router.route('/unblock/:userId').patch(unBlockUser);
router.route('/:userId').put(updateUser).delete(deleteUser);
router.route('/').get(checkCurrentUser, getCurrentUser); 

module.exports = router;
