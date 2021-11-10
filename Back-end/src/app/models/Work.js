const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({

fromdate:{
    type:Date, 
    required: [true," fromDate is required "],
},

todate:{
    type:Date, 
    required: [true," toDate is required "],
},

reason:{
    type:String, 
    required: [true," reason is required"]
},

registrationfor:{
    type:String, 
    required: [true," registration is required "],
    default:['Đặng Công Tuyến']
},

description:{
    type:String, 

},

// author:{
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User',
// }

},{timestamps:true})

module.exports = mongoose.model('Work', workSchema);

