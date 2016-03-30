var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');

var mysqlPool = mysql.createPool({
    host: 'jobdatabase-instance.c2gvfuzbyz3i.eu-central-1.rds.amazonaws.com',
    port: 3306,
    database: 'JobDatabase',
    user: 'nikos',
    password: '66reggae',

//    host: 'localhost',
//    port: 3306,
//    database: 'jobdatabase',
//    user: 'root',
//    password: 'qwerty',

    acquireTimeout: 2000,
    connectionLimit: 20,
    queueLimit: 100
});

/* GET all jobs */
router.get('/jobs', function (req, res) {

    mysqlPool.getConnection(function (err, connection) {
        if (err) {
            console.log(err);
            return;
        } else {
            var q = "SELECT * "
            +"FROM jobs, fields "
            +"WHERE jobs.ID = fields.jobID";

//            var q = "SELECT * "
//            +"FROM jobs, fields, companies "
//            +"WHERE jobs.ID = fields.jobID AND jobs.company = companies.companyName";
            connection.query(q, function (err, rows) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    connection.release();
                    //reconstruct json
                    var previousJobID = 0;
                    var hitJobId;
                    var timesThisJobHasHit = 0;
                    for (var i = 0; i < rows.length; i++) {
                        var j = rows[i];
                        if (i !== 0) {
                            if (previousJobID === j.jobID) {//we found a job with 1 or more fields
                                hitJobId = previousJobID;
                                if (hitJobId === j.jobID) {//repeated hit
                                    timesThisJobHasHit++;
                                } else {
                                    timesThisJobHasHit = 0
                                }
                                var arrayOfFields = [];
                                for (var x = 0; x < timesThisJobHasHit; x++) {
                                    arrayOfFields.push(rows[i - 1].field[x]);
                                }
                                //add to array current jobs field, and push array into job
                                arrayOfFields.push(j.field);
                                j.field = arrayOfFields;
                                previousJobID = j.jobID;
                                //and remove previous job
                                rows.splice(i - 1, 1);
                                i--;
                            } else {
                                timesThisJobHasHit = 0;
                                previousJobID = j.jobID;
                                var arrayOfFields = [];
                                arrayOfFields.push(j.field);
                                j.field = arrayOfFields
                            }
                        } else {
                            previousJobID = j.jobID;
                            var arrayOfFields = [];
                            arrayOfFields.push(j.field);
                            j.field = arrayOfFields
                        }
                    }
                    res.send(rows);
                }
            });

        }
    });
});

module.exports = router;