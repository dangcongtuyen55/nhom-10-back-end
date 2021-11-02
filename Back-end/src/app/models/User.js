const mongoose = require("mongoose");

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({

    // firstname:{
    //     type: String,
    //     trim:true,

    // },
    // lastname:{
    //     type:String,
    //     trim:true
    // },
    username:{
        type:String,
        trim:true,
        required:[true,"username is required "],
        unique:true,
        index:true
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        required:[true,"email is requried"]
    },
    password:{
        type:String,
        trim:true,
        required:[true,"pasword is required"],
        minlength:[6, 
            'Password must be at least 6 character!']
    },

    status:{
        type:Boolean,
        default:true
    },

    role:{
        type:Boolean,
        enum:['1', '0'],
        default:false
    },
    // contactphone:{
    //     type:String,
    //     unique:true,
    // },
    // profilepicture:{     
    //     type:String
    // }
},{timestamps:true})

userSchema.pre('save', function(next){
    let user = this; // get userget the user initialized from mongose

    //bcrypt pass
    bcrypt.hash(user.password, 10, function(error, hash){
        if(error){
            return next(error);
        }else{
            user.password = hash;
            next();
        }
    })  
})


module.exports = mongoose.model('User', userSchema);