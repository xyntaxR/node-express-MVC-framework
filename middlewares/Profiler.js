const BaseModelPostgres = require('../system/BaseModelPostgres'); //using PostGres queries
const BaseModelMySQL = require('../system/BaseModelMySQL');//using mySQl queries
const base_model = new BaseModelPostgres; //replace depending on the database used

class Profiler {
    
    profile(req, res, next) {
        const query =  base_model.last_query_executed();
        let html_str = `
            <fieldset style="border: 2px solid black; padding: 20px; margin: 0 50px 50px">
                <legend>URI</legend>
                <p>`+ req.url +`</p>
            </fieldset>
            <fieldset style="border: 2px solid black; padding: 20px; margin: 0 50px 50px">
                <legend>Session</legend>`;

                for (let x in req.session) {
                    html_str += `<p><span style="font-weight:bold">`+ x +`</span>: `+ JSON.stringify(req.session[x])  +`</p>`;
                }
            
        html_str += `</fieldset>
            <fieldset style="border: 2px solid black; padding: 20px; margin: 0 50px 50px">
                <legend>Method</legend>
                <p>`+ req.method +`</p>
            </fieldset>
            <fieldset style="border: 2px solid black; padding: 20px; margin: 0 50px 50px">
                <legend>Post data</legend>
                <p>`+ JSON.stringify(req.body) +`</p>
            </fieldset>
            <fieldset style="border: 2px solid black; padding: 20px; margin: 0 50px 50px">
                <legend>Query</legend>
                <p>`+ query +`</p>
            </fieldset>
            <fieldset style="border: 2px solid black; padding: 20px; margin: 0 50px 50px">
                <legend>HTTP Headers</legend>`;
                for (let i = 0; i < req.rawHeaders.length; i+=2) {
                    html_str += `<p><span style="font-weight:bold">`+ (req.rawHeaders[i]) + `</span>: `+ (req.rawHeaders[i+1])  +`</p>`;
                }
            html_str += `</fieldset>`;   

        const originalRender = res.render;
        res.render = function (view, options, callback) {
            originalRender.call(this, view, options, function (err, html) {
                const modifiedHtml = html + html_str;
                res.send(modifiedHtml);
            });
        };
        next();
    }
}

module.exports = new Profiler().profile;
