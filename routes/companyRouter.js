const express=require('express')
const router=express.Router()
const companyController=require('../controller/companyController')

router.post('/createCompany',companyController.sighnUpCompany)
router.get('/:comapnyId',companyController.getCompanyById)
router.get('/',companyController.getCompany)

module.exports=router