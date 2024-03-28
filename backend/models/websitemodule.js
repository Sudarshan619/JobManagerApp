const mongoose = require("mongoose")
const {Schema} = mongoose;
const WebsiteSchema = new Schema ({
   WebsiteName:{
         type:String,
         required:true
      },
   Image:{
         type:String,
         required:true
    }

}) 

module.exports = mongoose.model('Website',WebsiteSchema)