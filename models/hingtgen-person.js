/*
==============================================================================
; Title: hingtgen-person.js
; Author: Shane Hingtgen
; Bellevue University
; Date: 04/10/23
; Description: person schema for our API
; Work Cited: 
    Coding Guidelines
    Web-420 Assign_5
    Web-420 GitHub Examples
=================================================================================================================
*/
"use-strict";
const mongoose = require("mongoose"); //variable assigned to our mongoose require statement
const Schema = mongoose.Schema; //schema variable and assigned to the mongoose schema object

//our role schema
let roleSchema = new Schema({
  // schema fields with the type of String
  text: { type: String },
});

//our dependant schema
let dependentSchema = new Schema({
  // schema fields with the type of String
  firstName: { type: String },
  lastName: { type: String },
});

//our person schema
let personSchema = new Schema({
  // schema fields with the type of String
  firstName: { type: String },
  lastName: { type: String },
  roles: [roleSchema], //type array and our roleSchema
  dependents: [dependentSchema], //type array and our dependantSchema
  birthDate: { type: String },
});

module.exports = mongoose.model("Person", personSchema);
