const express = require('express');

const {getAllWork,createOneWork, updateOneWork, deleteOneWork } = require('../app/controllers/workController');

const {verifyToken} = require('../app/middlewares/verifyToken');

const router = express.Router();


router.route('/').get(getAllWork).post( verifyToken, createOneWork);
router.route('/:workId').put( verifyToken,updateOneWork).delete( verifyToken,deleteOneWork);

module.exports = router;    