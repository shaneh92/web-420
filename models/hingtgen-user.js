/*
==============================================================================
; Title: hingtgen-user.js
; Author: Shane Hingtgen
; Bellevue University
; Date: 04/19/23
; Description: user schema for our userAPI
; Work Cited: 
    Coding Guidelines
    Web-420 Assign_6
    Web-420 GitHub Examples
=================================================================================================================
*/
const mongoose = require("mongoose"); //variable assigned to our mongoose require statement
const Schema = mongoose.Schema; //schema variable and assigned to the mongoose schema object

let userSchema = new Schema({
  userName: { type: String },
  password: { type: String },
  emailAddress: { type: String },
});

module.exports = mongoose.model("User", userSchema);
