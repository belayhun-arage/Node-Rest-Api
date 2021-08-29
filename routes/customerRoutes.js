const express=require('express')
const router=express.Router()
const customerController=require('../controller/customerController')


router.get('/',customerController.getAllCustomers)
router.post('/registerCustomer',customerController.registerCustomer)



module.exports=router