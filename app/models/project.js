const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
 required: true,
}, // atleast the name is required so now its an object
description: String,
beforeImg: String,// store image URLs for now until I learn to use Cloudinary 
afterImg: String,
tags: [String], // stored as array
createdBy: {
    type: mongoose.Schema.Types.ObjectId, //This field is going to hold a MongoDB ObjectId not a string
    ref: 'User', // This ObjectId refers to a document in the User collection
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Project', ProjectSchema)