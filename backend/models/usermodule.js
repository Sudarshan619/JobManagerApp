const mongoose = require("mongoose")
const {Schema} = mongoose;
const UserSchema = new Schema ({
   Name:{
         type:String,
         required:true
      },
   Email:{
         type:String,
         required:true
    },
   Password:{
      type:String,
      required:true
    },
   Date:{
      type:String,
      default:new Date()
   }

}) 

module.exports = mongoose.model('User',UserSchema)