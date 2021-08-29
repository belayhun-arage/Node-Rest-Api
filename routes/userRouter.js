const express=require('express')
const router=express.Router()
const userController=require('../controller/userController')
const customerController=require('../controller/customerController')


router.get('/',userController.getAllUser)
router.get('/:userId',userController.getUserById)
router.post('/createAccount',userController.createAccount)
router.post('/registerCustomer',customerController.registerCustomer)
// router.patch('/:userId',userController.updateUser)
router.delete('/:userId',userController.deleteUser)
router.post('/login',userController.userLogIn)
router.get('/logout',userController.userLogOut)

module.exports=router