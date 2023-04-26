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
 *               - userName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userName:
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
      userName: req.body.userName,
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
 * /api/customers/:username/invoices
 *   post:
 *     tags:
 *       - Customers
 *     name: createInvoice
 *     summary: Creates a new invoice
 *     requestBody:
 *       description: invoice information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - subtotal
 *               - tax
 *               - dateCreate
 *               - dateShipped
 *               - lineItems
 *             properties:
 *               serName:
 *                 type: string
 *               subtotal:
 *                 type: string
 *               tax:
 *                 type: string
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
 *         description: Invoice added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post("/customers/:username/invoices", async (req, res) => {});
try {
    Customer.findOne({userName: req.body.userName}) 
}
//   try {
//     Customer.findOne({ userName: req.body.userName }, function (err, customer) {
//       if (err) {
//         console.log(err);
//         res.status(501).send({
//           message: `MongoDB Exception: ${err}`,
//         });
//       } else {
//         console.log(customer);
//         if (customer) {
//           const newInvoice = {
//             userName: req.body.userName,
//             subtotal: req.body.subtotal,
//             tax: req.body.tax,
//             dateCreated: req.body.dateCreated,
//             dateShipped: req.body.dateShipped,
//             lineItems: {
//               name: req.body.name,
//               price: req.body.price,
//               quantity: req.body.quantity,
//             },
//           };
//           if (newInvoice) {
//             console.log("In");
//             res.status(200).send({
//               message: "User logged in",
//             });
//           } else {
//             console.log("Invalid username and/or password");
//             res.status(401).send({
//               message: `Invalid username and/or password`,
//             });
//           }
//         }
//         if (!user) {
//           console.log("Invalid username and/or password");
//           res.status(401).send({
//             message: `Invalid username and/or password`,
//           });
//         }
//       }
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).send({
//       message: `Server Exception: ${e}`,
//     });
//   }
// });
//       const newInvoice = {
//         userName: req.body.userName,
//         subtotal: req.body.subtotal,
//         tax: req.body.tax,
//         dateCreated: req.body.dateCreated,
//         dateShipped: req.body.dateShipped,
//         lineItems: {
//           name: req.body.name,
//           price: req.body.price,
//           quantity: req.body.quantity,
//         },
//       };

//       await Customer.create(newInvoice, function (err, invoice) {
//         if (err) {
//           console.log(err);
//           res.status(500).send({
//             message: `MongoDB Exception: ${err}`,
//           });
//         } else {
//           console.log(invoice);
//           res.json(invoice);
//         }
//       });

//     });
// } catch (e) {
//     console.log(e);
//     res.status(500).send({
//       message: `Server Exception: ${e.message}`,
//     });
//   }
// });

/**
 * findAllInvoicesByUserName
 * @openapi
 * /api/customers/:username/invoices:
 *   get:
 *     tags:
 *       - Customers
 *     description:  API for looking up an invoice
 *     summary: looks up an invoice
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         description: Customer userName
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
    Customer.findOne({ userName: req.body.userName }, function (err, customer) {
      if (err) {
        console.log(err);
        res.status(501).send({
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
// exporting our routes
module.exports = router;
