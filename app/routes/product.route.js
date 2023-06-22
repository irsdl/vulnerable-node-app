const express = require('express');
const qs = require('querystring');
const app = express();
const productRoutes = express.Router();

let Product = require('../models/Product');

productRoutes.route('/lookup').get(function(req, res) {
	let category = req.query.category;
  console.log("raw category from querystring: " + category);
	console.log("JSON.stringify category from querystring: " + JSON.stringify(category));
	if (typeof category !== 'undefined' && category != "") {
		query = { $where: `this.category == '${category}' && this.released == 1` }
		//Simple injection: pass in "' || '2'=='2" (without double quotes)
		// This will return all records
		//
		// JS injection is also possible here, because the where clause evaluates a JS expression
    console.log("Raw MongoDB query: " + query);
		console.log("JSON.stringify MongoDB query: " + JSON.stringify(query));
		Product.find(query)
		    .then(products => {
		        console.log("Data Retrieved: " + products);
		        res.render('productlookup', { title: 'Product Lookup', products: products });
		    })
		    .catch(err => {
		        console.log(err);
		        res.json(err);
		    });
	}
	else {
		res.render('productlookup', { title: 'Product Lookup', products:[]});
	}	
});


/** Allow a similar query using POST and JSON
  * Similar to above, inject data like
  * {"category":"' || '2'=='2"}

  Sample default CURL request::
	curl -X POST http://localhost:4000/product/lookup -H 'Content-Type: application/json' -d '{"category": "guest"}'
  And Injection (need to escape our injected single quotes for CURL only):
	curl -X POST http://localhost:4000/product/lookup -H 'Content-Type: application/json' -d '{"category": "guest'\'' || '\''2'\''=='\''2"}'
  */
productRoutes.route('/lookup').post(function(req, res) {
	let category = req.body.category;
  console.log("raw category from body: " + category);
	console.log("JSON.stringify category from body: " + JSON.stringify(category));
	if (typeof category !== 'undefined') {
		query = { $where: `this.category == '${category}' && this.released == 1` }
    console.log("Raw MongoDB query: " + query);
		console.log("JSON.stringify MongoDB query: " + JSON.stringify(query));
		Product.find(query)
		    .then(products => {
		        console.log("Data Retrieved: " + products);
		        res.json({products});
		    })
		    .catch(err => {
		        console.log(err);
		        res.json(err);
		    });
	}
	else {
		res.json({});
	}	
});

productRoutes.route('/lookup2').get(lookup2);

productRoutes.route('/lookup2').post(lookup2);

function lookup2(req, res) {
	let query = req.body;
  if (typeof query === 'undefined' || Object.keys(query).length <= 0) {
    query = req.query;
  }
  console.log("raw request body: " + query);
  if (typeof query !== 'undefined' && Object.keys(query).length > 0) {
  	console.log("JSON.stringify request body: " + JSON.stringify(query));
   
    query.released = 1;
    console.log("raw MongoDB query: " + query);
  	console.log("JSON.stringify MongoDB query: " + JSON.stringify(query));
  	Product.find(query)
  	    .then(products => {
  	        console.log("Data Retrieved: " + products);
  	        res.render('productlookup', { title: 'Product Lookup 2', products: products });
  	    })
  	    .catch(err => {
  	        console.log(err);
  	        res.json(err);
  	    });
  }
	else {
		res.json({});
	}	
}

productRoutes.route('/lookup3').get(function(req, res) {
	res.render('productlookup', { title: 'Product Lookup 3'});
});

productRoutes.route('/lookup3').post(function(req, res) {
	let categoryData = req.body.category;
	let query = `{"category": "${categoryData}", "released": 1}`
	query = JSON.parse(query)
	console.log("request " + JSON.stringify(query));
	query = {category: query.category}
	console.log("request " + JSON.stringify(query));

	console.log("MongoDB query: " + JSON.stringify(query));
	Product.find(query)
	    .then(products => {
	        console.log("Data Retrieved: " + products);
	        res.render('productlookup', { title: 'Product Lookup 3', products: products });
	    })
	    .catch(err => {
	        console.log(err);
	        res.json(err);
	    });
});


/*

This is similar to /lookup but uses backticks
*/

productRoutes.route('/lookup4').post(function(req, res) {
	let category = req.body.category;
	console.log("request " + JSON.stringify(category));
	if (typeof category !== 'undefined') {
		query = { $where: 'this.category == `'+category+'` && this.released == 1' }
		console.log("MongoDB query: " + JSON.stringify(query));
		Product.find(query)
		    .then(products => {
		        console.log("Data Retrieved: " + products);
		        res.json({products});
		    })
		    .catch(err => {
		        console.log(err);
		        res.json(err);
		    });
	}
	else {
		res.json({});
	}	
});

productRoutes.route('/lookup4').get(function(req, res) {
	res.render('productlookup', { title: 'Product Lookup 4'});
});


/*

This passes the whole request body through as a JSON string without parsing it so it only supports POST!
*/

var rawBodySaver = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
}


productRoutes.route('/lookup_raw').post(express.raw({ verify: rawBodySaver, type: () => true }), 
  (req, res) => {
    sendRawReqBodyThrough(req,res);
  }
);


function sendRawReqBodyThrough(req, res){
  query = JSON.parse(req.rawBody);
  console.log("raw request body: " + query);
  if (typeof query !== 'undefined') {
  	console.log("JSON.stringify request body: " + JSON.stringify(query));

    console.log("raw MongoDB query: " + query);
  	console.log("JSON.stringify MongoDB query: " + JSON.stringify(query));
  	Product.find(query)
  	    .then(products => {
  	        console.log("Data Retrieved: " + products);
  	        res.render('productlookup', { title: 'Product Lookup 5', products: products });
  	    })
  	    .catch(err => {
  	        console.log(err);
  	        res.json(err);
  	    });
  }
	else {
		res.json({});
	}	
}

/*

This is similar to /lookup2 but with aggregate
*/

productRoutes.route('/lookup_agg').get(function(req, res) {
	res.render('productlookup2', { title: 'Product Lookup 5'});
});

productRoutes.route('/lookup_agg').post(function(req, res) {
	let query = req.body;
  if (typeof query !== 'undefined' && Object.keys(query).length > 0) {
	console.log("request " + JSON.stringify(query));

	console.log("MongoDB query: " + JSON.stringify(query));
	Product.aggregate(query)
	    .then(products => {
	        console.log("Data Retrieved: " + products);
	        res.json({products});
	    })
	    .catch(err => {
	        console.log(err);
	        res.json(err);
	    });
  }
	else {
		res.json({});
	}	
});


module.exports = productRoutes;
