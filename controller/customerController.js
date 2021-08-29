const Customer = require('../models/customerModel')
const Role=require('../models/role')

const registerCustomer=async (req,res)=>{
    const {email,bussinessSector,profession}=req.body
    const customer=new Customer({email,bussinessSector,profession})
        await customer.save((err,customer)=>{
            if(err){
                res.status(500).send({ message: err });
                return;
            }
            Role.findOne({ name: "customer" }, (err, role) => { 
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                customer.role = [role._id];
                customer.save(err=>{
                    if(err){
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.status(201).json(customer._id)
                })      
        }) 
    }) 
}

const getCostomerById=(req,res)=>{
    const customerId=req.body.customerId
    const customer=Customer.findById(customerId)
    if(customer){
        res.status(200).json(customer)
    }
    else{
        res.status(403).json("Bad request")
    }
}

const getAllCustomers=(req,res)=>{
    const customers=Customer.find()
    if(customers){
        res.status(200).json(customers)
    }else{
        res.status(403).json("Bad Request")
    }
}

module.exports={
    registerCustomer,
    getCostomerById,
    getAllCustomers
}
