/*
==============================================================================
; Title: hingtgen-session-routes.js
; Author: Shane Hingtgen
; Bellevue University
; Date: 04/25/23
; Description: This is our routes file for our customerAPI
; Work Cited: 
    Coding Guidelines
    Web-420 Assign_7
    Web-420 GitHub Examples
=================================================================================================================
*/
const express = require("express");
const router = express.Router();
const Customer = require("../models/hingtgen-customer.js");

/**
 * createCustomer
 * @openapi
 * /api/customers:
 *   post:
 *     tags:
 *       - Customers
 *     name: createCustomers
 *     summary: Creates a new Customer document
 *     requestBody:
 *       description: customer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - username
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post("/customers", async (req, res) => {
  try {
    const newCustomer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
    };

    await Customer.create(newCustomer, function (err, customer) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(customer);
        res.json(customer);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

/**
 * createInvoiceByUserName
 * @openapi
 * /api/customers/{username}/invoices:
 *   post:
 *     tags:
 *       - Customers
 *     name: createInvoiceByUserName
 *     description: This API will create a new invoice for the username provided
 *     summary: add existing username to create a new invoice for the username
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description:
 *         schema:
 *           type: string
 *     requestBody:
 *       description: invoice information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - subtotal
 *               - tax
 *               - dateCreated
 *               - dateShipped
 *               - lineItems
 *             properties:
 *               subtotal:
 *                 type: number
 *               tax:
 *                 type: number
 *               dateCreated:
 *                 type: string
 *               dateShipped:
 *                 type: string
 *               lineItems:
 *                 type: array
 *                 items:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          price:
 *                              type: number
 *                          quantity:
 *                              type: number
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post("/customers/:username/invoices", async (req, res) => {
  try {
    await Customer.findOne(
      { username: req.params.username },
      function (err, customer) {
        let newInvoice = {
          subtotal: req.body.subtotal,
          tax: req.body.tax,
          dateCreated: req.body.dateCreated,
          dateShipped: req.body.dateShipped,
          lineItems: req.body.lineItems,
        };
        if (err) {
          console.log(err);
          res.status(500).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          customer.invoices.push(newInvoice);
          customer.save(function (err, customer) {
            if (err) {
              console.log(err);
            } else {
              console.log(customer);
              res.json(customer);
            }
          });
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

/**
 * findAllInvoicesByUserName
 * @openapi
 * /api/customers/{username}/invoices:
 *   get:
 *     tags:
 *       - Customers
 *     description:  API for looking up an invoice
 *     summary: looks up an invoice
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: Customer username
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Customer Found in MongoDB
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get("/customers/:username/invoices", async (req, res) => {
  try {
    Customer.findOne(
      { username: req.params.username },
      function (err, customer) {
        if (err) {
          console.log(err);
          res.status(501).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          console.log(customer);
          res.json(customer);
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});
// exporting our routes
module.exports = router;
