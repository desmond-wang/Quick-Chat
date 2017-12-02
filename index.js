const express = require('express');
const app = express();
const QuickBooks = require('node-quickbooks')
const qbOAuth = require('./quickbookOAuth.json')
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    const rs = [];
    rs.push({ "text": "Hi. " + (Math.random() * 5 + 1).toFixed(0) + " is a lucky number..." });
    res.send(rs);
});

app.get('/item/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const item = qbo.getItem(id, (error, item) => console.log(item))
    console.log(item);
    const rs = [];
    rs.push({});
    res.send(rs);
});

function getItem(id) {
    qbo.getItem(id, (error, item) => console.log(item))
}
    
app.listen(PORT, () => console.log(`Chatfuel Bot-Server listening on port ${ PORT }`));
 
const consumerKey = 'Q04Nh3GPuQZtJah8cPwymbrVWaiZ17cw4d4PpdmZQAPl7Hu7DB';
const consumerSecret = 'JSij4Gw4aZNMZlAjt5VT8Vi3tZRkd3lHLBmCsmJL';
const realmId = 123145932193644;
const oauthTokenSecret = null;
const minorversion = null;
const oauthversion = '2.0';

var qbo = new QuickBooks(consumerKey,
    consumerSecret,
    qbOAuth.access_token,
    oauthTokenSecret,
    realmId,
    true, // use the sandbox?
    true,
    minorversion, 
    oauthversion, 
    qbOAuth.refresh_token)



