var express = require('express');
var router = express.Router();
var http = require('http');
var fs = require('fs');
var wkhtmltopdf = require('wkhtmltopdf');

/**
 *
 * @type {module.exports.print|{templates, scales}}
 */
router.get('/api/extension/cowi_test/image', function (req, response) {
    req.setTimeout(0); // no timeout
    var key = req.query.k, q;
    console.log(key);

    //wkhtmltopdf.command = "/root/wkhtmltox/bin/wkhtmltoimage";
    wkhtmltopdf.command = "/home/mh/Downloads/wkhtmltox/bin/wkhtmltoimage";

    fs.readFile(__dirname + "/../../../public/tmp/print/json/" + key, 'utf8', function (err, data) {

        if (err) {
            response.send({success: true, error: err});
            return;
        }

        response.setHeader('Content-Type', 'image/png');

        console.log(data);

        q = JSON.parse(data);

        var url = '/app/' + q.db + '/' + q.schema + '/?tmpl=' + q.tmpl + '.tmpl&l=' + q.legend + '&h=' + q.header + '&px=' + q.px + '&py=' + q.py + '&td=' + q.dateTime+ '&d=' + q.date + '&k=' + key + '&t=' + q.title + '&c=' + q.comment + (q.config ? "&config=" + q.config : "") + q.anchor;

        console.log("http://127.0.0.1:3000" + url);

        wkhtmltopdf("http://127.0.0.1:3000" + url, {
            encoding: "utf-8",
            javascriptDelay: 400,
            windowStatus: "all_loaded",
            debug: true,
            noStopSlowScripts: true,
            debugJavascript: true
        }, function (err) {
            console.log(err);
        }).pipe(response);
    });
});


module.exports = router;