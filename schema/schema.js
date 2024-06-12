const S=require('mongoose')

const sch_const= new S.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    job:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },

})

const model_con=S.model('monday',sch_const);
module.exports=model_con