const client = require('../config/database')[1];
last_query = '';

client.connect();

class BaseModelPostgres {
    async query(query,values) {
        last_query = [query, values];
        const result = await client.query(query, values);
        return result.rows;
    };
    async query_row(query,values) {
        last_query = [query, values];
        const result = await client.query(query, values);
        return result.rows[0];
    };
    last_query_executed() {
        return last_query;
    }
}

module.exports = BaseModelPostgres;


// client.query(`SELECT * FROM students WHERE id = $1`, [1], function(err, res) {
//     if(!err) {
//         console.log(res.rows);
//     }
//     else {
//         console.log(res.message);
//     }
//     client.end;
// })

// (async () => {
//     await client.connect();
//     const result = await client.query(`SELECT * FROM students WHERE id = $1`, [1]);
//     console.log(result.rows);
//     client.end();
// })();