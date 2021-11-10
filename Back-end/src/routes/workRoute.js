const express = require('express');

const {getAllWork, getWorkById ,createOneWork, updateOneWork, deleteOneWork } = require('../app/controllers/workController');

const {verifyToken} = require('../app/middlewares/verifyToken');

const router = express.Router();


router.route('/getall').get(getAllWork)
router.route('/:workId').get(getWorkById)
router.route('/create').post( verifyToken, createOneWork);
router.route('/update/:workId').put( verifyToken,updateOneWork);
router.route('/:workId').delete( verifyToken,deleteOneWork);

module.exports = router;    