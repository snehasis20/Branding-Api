const express = require("express");
const con = require("./config.js");
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/get-dealer-list", (req, res) => {
    const query = "SELECT cust_name, cust_sap_id, mobile_no, email, cust_contact_person FROM customer_master WHERE bp_group = 'GTDC'";
    con.query(query, (err, result) => {
        if (err) {
            res.status(500).send("error");
        } else {
            res.status(200).json(result);
        }
    });
});



// app.get("/get-subdealer-list", (req, res) => {
//     const query = "SELECT cust_name, cust_sap_id, mobile_no, email, cust_contact_person, bp_group  FROM customer_master WHERE bp_group IN ('GSAR', 'GSDL', 'STPC')";
//     con.query(query, (err, result) => {
//         if (err) {
//             res.status(500).send("error");
//         } else { 
//             res.status(200).json(result);
//         }
//     });
// });
app.get("/get-subdealer-details", (req, res) => {
    const vendorCode = req.query.vendorCode;
    const query = `
        SELECT cust_name, cust_sap_id, mobile_no, email, cust_contact_person, bp_group ,vendor_code
        FROM customer_master 
        WHERE  vendor_code = ?
    `;
    con.query(query, [vendorCode], (err, result) => {
        if (err) {
            res.status(500).send("error");
        } else {
            res.status(200).json(result);
        }
    });
});




app.listen(4000, () => {
    console.log("Server is running on port 4000");
  });
  