/*
==============================================================================
; Title: hingtgen-customer.js
; Author: Shane Hingtgen
; Bellevue University
; Date: 04/25/23
; Description: customer schema for our customers collection
; Work Cited: 
    Coding Guidelines
    Web-420 Assign_7
    Web-420 GitHub Examples
=================================================================================================================
*/

const mongoose = require("mongoose"); //variable assigned to our mongoose require statement
const Schema = mongoose.Schema; //schema variable and assigned to the mongoose schema object

// our lineItemSchema
let lineItemSchema = new Schema({
  name: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

// invoice schema
let invoiceSchema = new Schema({
  subtotal: { type: Number },
  tax: { type: Number },
  dateCreated: { type: String },
  dateShipped: { type: String },
  lineItems: [lineItemSchema], //dependant on our lineItemSchema
});

let customerSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String },
  invoices: [invoiceSchema],
});

module.exports = mongoose.model("Customer", customerSchema);
