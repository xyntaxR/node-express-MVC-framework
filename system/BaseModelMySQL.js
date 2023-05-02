const connection = require('../config/database')[0];
const mysql = require('mysql2');
let last_query = '';

class BaseModel {
    // for multiple row results, insert and update queries
    query(query, values = []) {
        const generated_query = mysql.format(query, values);
        last_query = generated_query;
        return new Promise(function (resolve, reject) {
            connection.query(query, values, function (err, result) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    // for getting single result row
    query_row(query, values = []) {
        const generated_query = mysql.format(query, values);
        last_query = generated_query;
        return new Promise(function (resolve, reject) { 
            connection.query(query, values, function (err, result) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result[0]);
                }
            });
        });
    }
    last_query_executed() {
        return last_query;
    }
}

module.exports = BaseModel;