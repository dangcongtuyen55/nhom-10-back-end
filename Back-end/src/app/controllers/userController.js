const User = require('../models/User');

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.register = async  (req, res, next) => {
   try {
       const user = await User.create(req.body)
       const token = jwt.sign({userId: user._id}, process.env.APP_SECRECT);
       res.status(200).json({
           status: 'success',
           data: {token,
                  email: user.email,
                  userName: user.username
        }
       })
   } catch (error) {
      next(error)
   }
}

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user){
            //Error:  Email is not correct
            const err = new Error('Email is not correct !!');
            err.statusCode = 400;
            return next(err)
        }
        if(!user.status){
            //Error:  Email is not correct
            const err = new Error('your account is blocked !!');
            err.statusCode = 400;
            return next(err)
        }
        if(bcrypt.compareSync(req.body.password, user.password)){
            const token = jwt.sign({userId: user._id, email:user.email,userName: user.username, role:user.role}, process.env.APP_SECRECT);
            res.status(200).json({
                status:'success',
                data:{
                    token,
                    email: user.email,
                    userName: user.username,
                    role: user.role
                }
            })
        }else{
            //Error: password is not correct
            const err = new Error('Password is not correct !!');
            err.statusCode = 400;
            return next(err)
        }
    } catch (error) {
        res.json(error)
    }

}


// exports.register = async (req, res, next)=>{
//     try {
//             const user = await User.create(req.body)
//             res.status(200).json({
//                 status:'success',
//                 data:{user}
//             })
//     } catch (error) {
//         res.json(error)
//     }
// }

// exports.login = (req, res, next)=>{
//     res.json('user login')
// }


//Get current User

exports.getCurrentUser = async(req, res, next)=>{
    try {
        const data = {user:null};
        if(req.user){
            const user = await User.findOne({_id: req.user.userId});
            data.user= {userName: user.username}
        }
        res.status(200).json({
            status:'success',
            data: data,
        });
        console.log(data)
    } catch (error) {
        res.json(error);
    }
}


exports.getAllUsers = async (req, res, next) => {
    try {
        const user = await User.find({})
        res.status(200).json({
            status:'success',
            results:user.length,
            users: user
        })
    } catch (error) {
        res.json(error);
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const{userId} = req.params;
        const user = await User.findByIdAndUpdate(userId,{...req.body},{new:true, runValidators:true})
        res.status(200).json({
            status:'success',
            data: {user}
        })
    } catch (error) {
        res.json(error);
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const{userId} = req.params;
        await User.findByIdAndDelete(userId)
        res.status(200).json({
            status:'success',
            message: 'Delete user successfully!'
        })
    } catch (error) {
        
    }

}
exports.blockUser = async (req, res, next) => {
    try {
        const{userId} = req.params;
        await User.findByIdAndUpdate(userId,{status:false})
        res.status(200).json({
            status:'success',
            message: 'Update user successfully!'
        })
        } catch (error) {
            
        }

}

exports.unBlockUser = async (req, res, next) => {
    try {
        const{userId} = req.params;
        await User.findByIdAndUpdate(userId,{status:true})
        res.status(200).json({
            status:'success',
            message: 'UnBlock user successfully!'
        })
        } catch (error) {
            
        }

}

