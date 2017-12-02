const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000



app.get('/', (req, res) => {
	const jsonResponse = [];
	jsonResponse.push({ "text": "Hi. " + (Math.random() * 5 + 1).toFixed(0) + " is a lucky number..." });
	res.send(jsonResponse);
    })
    .listen(PORT, () => console.log(`Chatfuel Bot-Server listening on port ${ PORT }`));
