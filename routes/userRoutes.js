const express = require('express');
const router = express.Router();
const userController=require("../controller/userController");

const { route } = require('./blogRoutes');

router.use(express.static(__dirname+"./public/"))

router.get('/sighnup',userController.user_SighnUp_get)
router.post('/sighnup',userController.user_SighnUp_Post)
router.get('/sighnin',userController.user_SighnIn_Get)
router.post('/sighnin',userController.user_SighnIn_Post)
router.get('/about',userController.user_profile)
router.get('/logout',userController.user_SighnOut_get)

module.exports=router;