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
const composerAPI = require("./routes/hingtgen-composer-routes.js");

//app variable assigned to express
const app = express();

const CONN =
  "mongodb+srv://web420_user:1234@bellevueuniversity.ut5xprd.mongodb.net/web420DB"; //Our MongDB Server
//port set
app.set("port", process.env.PORT || 3000);

//Connection to MongoDB
mongoose
  .connect(CONN)
  .then(() => {
    console.log(
      "Connection to MongoDB database was successful\n  If you see this message it means you were able to connect to your MongoDB Atlas cluster"
    ); //This will verify we have connect to server
  })
  .catch((err) => {
    console.log("MongoDB Error: " + err.message); //Will tell us we did not connect to server
  });

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
app.use("/api", composerAPI);

//creating our http server on the port number
http.createServer(app).listen(app.get("port"), function () {
  console.log(`Application started and listening on port ${app.get("port")}`);
});
