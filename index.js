const express = require('express');
const app = express();

app.listen(3000, function() {
    console.log('Chatfuel Bot-Server listening on port 3000...');
});

app.get('/*', function(req, res) {
    const jsonResponse = [];
    jsonResponse.push({ "text": "Hi. " + (Math.random() * 5 + 1).toFixed(0) + " is a lucky number..." });
    res.send(jsonResponse);
});
