/*
==============================================================================
; Title: app.js Web-420
; Author: Shane Hingtgen
; Bellevue University
; Date: 03/13/2023
; Description: This file sets up the backend
; Work Cited: 
    Coding Guidelines
    Web-420 Assign
=================================================================================================================
*/
"use-strict";
//imports with require statements
const express = require("express");
const http = require("http");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const mongoose = require("mongoose");

//app variable assigned to express
const app = express();

//port set
app.set("port", process.env.PORT || 3000);

// setting app to use express.json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// object literal
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WEB 420 RESTful APIs",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"], //files containing annotations for the OpenAPI Specification
};

// assigning a variable to call swaggerJsdoc
const openapiSpecification = swaggerJsdoc(options);

// wire openapiSpecification to app variable
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

//creating our http server on the port number
http.createServer(app).listen(app.get("port"), function () {
  console.log(`Application started and listening on port ${app.get("port")}`);
});