// const { default: mongoose } = require("mongoose")
const mongoose = require("mongoose")
const {Schema} = mongoose;
const CompanySchema = new Schema ({
   User:{
      type: mongoose.Schema.Types.ObjectId,
      ref:  'User'
     },
   Website:{
      type:mongoose.Schema.Types.String,
      ref:'Website'
   },
   CompanyName:{
         type:String,
         required:true
      },
   Position:{
         type:String,
         required:true
    },
   Status:{
      type:String,
      default:"Applied"
    },
   Image:{
      type:String,
      required:true
   },
   Date:{
      type:String,
      default: () => new Date().toISOString()
   }

})

module.exports = mongoose.model('Company',CompanySchema)
