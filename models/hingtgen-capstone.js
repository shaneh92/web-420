/*
==============================================================================
; Title: hingtgen-capstone.js
; Author: Shane Hingtgen
; Bellevue University
; Date: 05/09/20233
; Description: team and player schema for capstone
; Work Cited: 
    Coding Guidelines
    Web-420 Assign_9
    Web-420 GitHub Examples
=================================================================================================================
*/
const mongoose = require("mongoose"); //variable assigned to our mongoose require statement
const Schema = mongoose.Schema; //schema variable and assigned to the mongoose schema object
// Player Schema
let playerSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  salary: { type: Number },
});

// Team schema
let teamSchema = new Schema({
  name: { type: String },
  mascot: { type: String },
  players: [playerSchema],
});

module.exports = mongoose.model("Teams", teamSchema);
