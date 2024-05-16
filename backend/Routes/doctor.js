const express = require("express")
const router = express.Router()
const mysql = require("mysql")
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect( (error) => {
    if(error){
        console.log(error)
    } else {
        console.log("Doctor Connected")
    }
});


// part of inserting doctor information as register

router.get("/getDocList/:id?", (req, res) => {
    const id = req.params.id;
    let query = "SELECT * FROM employee WHERE role_name = 'doctor'";
    let params = [];

    if (id) {
        query += " AND id = ?";
        params.push(id);
    }

    db.query(query, params, (error, result) => {
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            console.log(result);
            res.send(result);
        }
    });
});



function getAlreadExistEmerInfo(emergency){
    const {fName, mName, lName, tel, address, email} = emergency;
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM emergency_contact WHERE fName = ? AND lName = ?", [fName, lName], (error, result) => {
            if(error){
                console.log(error);
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

function insertEmergencyContact(emergency){
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO emergency_contact (fName, mName, lName, tel, addresses, email) VALUES (?,?,?,?,?,?)", [emergency.fName, emergency.mName, emergency.lName, emergency.tel, emergency.address, emergency.email], (error, result) => {
            if(error){
                console.log(error)
                reject(error);
            } else {
                console.log("Emergency Contact Inserted")
                resolve(result);
            }
        });
    });
}

function insertDocInfo(fName, mName, lName, idNumber, DOB, sex, address, tel, email, pw, nationality, race, religion, bloodType, emer_id, relation, role_name, d_license, d_department){
    return new Promise((resolve, reject) => {
        console.log(DOB);
        db.query("INSERT INTO employee (fName, mName, lName, idNumber, DOB, sex, addresses, tel, email, pw, nationality, race, religion, bloodType, e_id, relation, role_name, d_license_id, d_department) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [fName, mName, lName, idNumber, DOB, sex, address, tel, email, pw, nationality, race, religion, bloodType, emer_id, relation,role_name, d_license, d_department], (error, result) => {
            if(error){
                console.log(error)
                reject(error);
            } else {
                console.log("Doctor Inserted")
                resolve(result);
            }
        });
    });
}

function insertDocEdu(d_id, d_edu){
    return new Promise((resolve, reject) => {
        for (let i = 0; i < d_edu.length; i++) {
            db.query("INSERT INTO edu (id, level_edu, diploma, institute, country, year_graduated) VALUES (?, ?, ?, ?, ?, ?)", [d_id, d_edu[i].level_edu, d_edu[i].diploma, d_edu[i].institute, d_edu[i].country, d_edu[i].year_graduated], (error, result) => {
                if(error){
                    console.log(error)
                    reject(error);
                } else {
                    console.log("Doctor Education Inserted")
                    resolve(result);
                }
            });
        }
    });
}


router.post("/addDoc", async (req, res) => {
    const {info, edu} = req.body;
    const { fName, mName, lName, idNumber, DOB, sex, address, tel, email, pw, nationality, race, religion,bloodType, emergency, relation, role_name, d_license, d_department} = info;
    console.log("========================================= START ==============================================");
    console.log("First Name " + fName);
    console.log("DOB " + DOB);
    console.log("Relation " + bloodType);
    var emer_id;
    try {
        const alreadyDoc = await getAlreadExistEmerInfo(emergency);
        if(alreadyDoc.length != 0){
            // res.send(alreadyDoc[0]);
            emer_id = alreadyDoc[0].e_id;
            console.log("ALREADY EXIST EMERGENCY CONTACT");
            console.log(alreadyDoc[0].e_id);
        }else{
            const result = await insertEmergencyContact(emergency);
            console.log(result.insertId);
            emer_id = result.insertId;
        }
        const result = await insertDocInfo(fName, mName, lName, idNumber, DOB, sex, address, tel, email, pw, nationality, race, religion, bloodType, emer_id, relation, role_name, d_license, d_department);
        console.log(result);
        const d_id = result.insertId;
        const result2 = await insertDocEdu(d_id, edu);
        console.log(result2);
        res.send("Success");
    } catch (error) {
        console.log(error);
        res.send("Failed to insert doctor");
    }
    

});



module.exports = router;
// module.exports = getDocInfo