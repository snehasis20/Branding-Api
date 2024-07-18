const express = require("express");
const con = require("./config.js");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get("/get-dealer-list", (req, res) => {
  const query =
    "SELECT cust_name, cust_sap_id, mobile_no, email, cust_contact_person FROM customer_master WHERE bp_group = 'GTDC'";
  con.query(query, (err, result) => {
    if (err) {
      res.status(500).send("error");
    } else {
      res.status(200).json(result);
    }
  });
});

app.get("/get-subdealer-list", (req, res) => {
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

app.post("/submit-order", (req, res) => {
  const {
    orderfor,
    dealer_sap_code,
    dealer_name,
    dealer_mobileno,
    dealer_email_id,
    contact_person_name,
    mobile_no,
    subdealer_sap_code,
    subdealer_name,
    subdealer_email_id,
    subdealer_contact_person_name,
    channel_partner_type,
    subdealer_mobile_no,
    subdealer_contact_no,
    total_overall,
    name,
    address,
    contact_no_email,
    gst_no,
  } = req.body;

  const query = `
      INSERT INTO dealer_subdealer (
        orderfor, dealer_sap_code, dealer_name, dealer_mobileno, dealer_email_id, contact_person_name, mobile_no,
        subdealer_sap_code, subdealer_name, subdealer_email_id, subdealer_contact_person_name, channel_partner_type,
        subdealer_mobile_no, subdealer_contact_no, total_overall, name, address, contact_no_email, gst_no
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  con.query(
    query,
    [
      orderfor,
      dealer_sap_code,
      dealer_name,
      dealer_mobileno,
      dealer_email_id,
      contact_person_name,
      mobile_no,
      subdealer_sap_code,
      subdealer_name,
      subdealer_email_id,
      subdealer_contact_person_name,
      channel_partner_type,
      subdealer_mobile_no,
      subdealer_contact_no,
      total_overall,
      name,
      address,
      contact_no_email,
      gst_no,
    ],
    
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: "Order submitted successfully" });
    }
  );
});

app.get("/get-submit-order", (req, res) => {
    const query = "SELECT * FROM dealer_subdealer";
  
    con.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results);
    });
  });

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
