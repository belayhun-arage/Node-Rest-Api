const Company = require('../models/companyModel')
const Role=require('../models/role')
const jwt = require('jsonwebtoken');

const maxAge= 3 * 24 * 64 * 64;
const createTocken=(id)=>{
    return jwt.sign({id},"secret-key",{expiresIn:maxAge})
}

const sighnUpCompany=async (req,res)=>{
    const {name,bussinessEmail,bussinesPhone,country,city,location,website}=req.body
    try{
        const company=new Company({name,bussinessEmail,bussinesPhone,country,city,location,website})
        await company.save((err,company)=>{
            if(err){

                res.status(500).json(err)
            }
            Role.findOne({name:"company"},(err,role)=>{
                if(err){
                    res.json(500).json(err)
                }
                company.role=[role._id]
                company.save(err=>{
                    if(err){
                        res.json(500).json(err)
                    }else{
                        const tocken=createTocken(company._id)
                        res.cookie('jwt',tocken,{httpOnly:true,maxAge:maxAge*1000})
                        res.status(201).json({company:company._id}) 
                        console.log("tocken-created",tocken)
                    }

                })
            })
        })
    }catch{
        res.status(403).json("bad request")
    }
}
const getCompany=(req,res)=>{

}
const getCompanyById=async (req,res)=>{
    try{
        await Company.findById(req.params.comapnyId)
        .then((result) => {
            res.status(200).send(result);
            
        });
    }catch(err){console.log(err)}
}
const updateCompany=(req,res)=>{}
const deleteCompany=(req,res)=>{}

module.exports={
    sighnUpCompany,
    getCompany,
    getCompanyById,
    updateCompany,
    deleteCompany
}