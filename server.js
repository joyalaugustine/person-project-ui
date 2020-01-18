//Install express server
const express = require('express');
const path = require('path');


const app = express();

// Serve only the static files form the dist directory

app.get('*', function (req, res, next) {

    // Set CORS headers: allow all origins, methods, and headers: you may want to lock this down in a production environment
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));

    console.log('Request: ' + req);

    if (req.method === 'OPTIONS') {
        // CORS Preflight
        res.send();
    } else {
        var targetURL = 'https://dashboard' + req.url;

        console.log('URL: ' + targetURL)

        request({ url: targetURL + req.url, method: req.method, json: req.body, headers: { 'Authorization': req.header('Authorization') } },
            function (error, response, body) {
                if (error) {
                    console.error('error: ' + response.statusCode)
                }
                //                console.log(body);
            }).pipe(res);
    }
});

app.use(express.static(__dirname + '/dist/person-project'));


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

app.set('port', 8080);

app.listen(app.get('port'), function () {
    console.log('Proxy server listening on port ' + app.get('port'));
});
