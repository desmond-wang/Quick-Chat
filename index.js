const express = require('express');
const app = express();
const QuickBooks = require('node-quickbooks')
const qbOAuth = require('./quickbookOAuth.json')
const PORT = process.env.PORT || 5000
const gallery_tmpo = require('./gallery.json')
const postback_tmpo = require('./postback.json')
const urlbase = 'https://quickbookhackathon.herokuapp.com'

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


app.get('/', (req, res) => {
    const rs = [];
    rs.push({ "text": "Hi. " + (Math.random() * 5 + 1).toFixed(0) + " is a lucky number..." });
    res.send(rs);
});

app.get('/item/:id', (req, res) => {
    const id = req.params.id;
    qbo.getItem(id, function(error, item){
	const rs = [];
	tmp_gallery = JSON.parse(JSON.stringify(gallery_tmpo));
	const block = {
	    "title": item.Name,
	    "image_url": item.PurchaseDesc,
	    "subtitle": item.Description,
	    "buttons":[
		{
		    "type":"web_url",
		    "url":"https://rockets.chatfuel.com/store/shirt",
		    "title":"View Item"
		},
		{
		    "url": `${urlbase}/invoices/${item.Id}` ,
		    "type":"json_plugin_url",
		    "title":"Buy"
		}
	    ]
	}
	tmp_gallery.attachment.payload.elements.push(block);
	rs.push(tmp_gallery);
	res.send(rs);
    })
});

app.get('/item', (req, res) => {
    const category = req.query.category;
    let query = [
	{fetchAll: true}, 
	{Type: 'Inventory'}, 
	{field: 'FullyQualifiedName', value: `${category}%`, operator: 'LIKE'}
    ];
    qbo.findItems(query, function(error, item){
	const rs = [];
	const items = item.QueryResponse.Item;
	tmp_gallery = JSON.parse(JSON.stringify(gallery_tmpo));
	for (i = 0; i < items.length; i++) {
	    block = {
		"title": items[i].Name,
		"image_url": items[i].PurchaseDesc,
		"subtitle": items[i].Description,
		"buttons":[
		    {
			"type":"web_url",
			"url":"https://rockets.chatfuel.com/store/shirt",
			"title":"View Item"
		    },
		    {
			"url": `${urlbase}/invoices/${items[i].Id}` ,
			"type":"json_plugin_url",
			"title":"Buy"
		    }
		]
	    }
	    tmp_gallery.attachment.payload.elements.push(block);
	}
	rs.push(tmp_gallery);
	res.send(rs);
    })
});

app.get('/invoices/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const rs = [];
    rs.push({ "text": "Hi. " + (Math.random() * 5 + 1).toFixed(0) + " is a lucky number..." });
    res.send(rs);
})


app.listen(PORT, () => console.log(`Chatfuel Bot-Server listening on port ${ PORT }`));
 


