const mysql = require("mysql2");
const con = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "Gscl@2024",
    database: "bt_branding"
});

con.connect((err) => {
    if (err) {
        console.log(err);
        console.warn("error in connection");
    }
    else {
        console.warn("connected");
    }
})
module.exports = con;