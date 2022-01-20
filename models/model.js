const mongoose=require("mongoose");

const schema=mongoose.Schema;

const NameValueSchema= new schema({
    name:{
        type:String,
        required:[true,"Name is Required"],
    },
    value:{
        type:Number,
        required:[true,"Value is Required"],
    },
    
});

const db=mongoose.model("db",NameValueSchema);

module.exports=db;