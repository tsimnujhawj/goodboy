const mysql = require("mysql");

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root"
})

con.connect(function(error){
    if (error) throw error;
    console.log("connected!");
    con.query(sql, function(error, result){
        if (error) throw error;
        // Results display here

    })
})