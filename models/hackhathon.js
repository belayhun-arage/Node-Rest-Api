const mongoose=require('mongoose')
const hackahatonSchema=mongoose.Schema

const hackhahaton=new hackahatonSchema({
    RegistrationDeadlineDate:Date,
    PlaceOfTheHACKATHON:String,
    DateOfTheHACKATHON:String,
    Participants:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
      },
    GroupSize:Number,
    Restrictions:String,
    SpecialOpportunity:String,
    AvailableServicesForApplicants:String,
    MentorshipDates:String,
    Rewards:String

})

const hackhatonModel=mongoose.model("Hackhaton",hackhahaton)
module.exports=hackhatonModel