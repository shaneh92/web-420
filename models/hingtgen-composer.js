/*
==============================================================================
; Title: hingtgen-composer.js
; Author: Shane Hingtgen
; Bellevue University
; Date: 04/05/23
; Description: composer schema for our composerAPI
; Work Cited: 
    Coding Guidelines
    Web-420 Assign_4
    Web-420 GitHub Examples
=================================================================================================================
*/
const mongoose = require("mongoose"); //variable assigned to our mongoose require statement
const Schema = mongoose.Schema; //schema variable and assigned to the mongoose schema object

// our new composer schema
let composerSchema = new Schema({
  // schema fields with the type of String
  firstName: { type: String },
  lastName: { type: String },
});

//our export statement named Composer
module.exports = mongoose.model("Composer", composerSchema);
