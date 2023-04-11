/*
==============================================================================
; Title: hingtgen-person-routes.js
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
const express = require("express");
const router = express.Router();
const Person = require("../models/hingtgen-person.js");

/**
 * findAllPersons
 * @openapi
 * /api/persons:
 *  get:
 *     tags:
 *       - Person
 *     description: API for returning all persons from MongoDB.
 *     summary: returns an array persons.
 *     responses:
 *       '200':
 *         description: Array of person documents
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.get("/persons", async (req, res) => {
  // try statement, with error messages if failed
  try {
    Person.find({}, function (err, persons) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        // else it will show these results from the db
        console.log(persons);
        res.json(persons);
      }
    });
  } catch (e) {
    // catch with 500 error
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

/**
 * createPerson
 * @openapi
 * /api/persons:
 *   post:
 *     tags:
 *       - Person
 *     description: API for creating a new person document.
 *     summary: creates a new person document.
 *     requestBody:
 *       description: creation of person.
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - roles
 *               - dependents
 *               - birthDate
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               roles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *               dependents:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *               birthDate:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Array of person documents
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post("/persons", async (req, res) => {
  try {
    const newPerson = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      roles: req.body.roles,
      dependents: req.body.dependents,
      birthDate: req.body.birthDate,
    };

    await Person.create(newPerson, function (err, person) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(person);
        res.json(person);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

// exporting router to make this work, otherwise app will crash
module.exports = router;
