require('dotenv').config()

const mongoose = require('mongoose');
const mongo_url = process.env.MONGODB_URL

const connection = async ()=>{
    mongoose.connect(mongo_url)
    .then(()=>{
    console.log('Database connected ');
  }).catch((err)=>{
    console.log("connection failed ");
  })
}
module.exports=connection


