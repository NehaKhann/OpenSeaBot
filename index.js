const bodyParser = require('body-parser');
const express = require('express');
const Call = require('./src/constructors/call');

//API
const app = express();
const port = 3006;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// app.get('/api/users', function (req, res) {
// 	return res.json({ user: 'maaz' });
// });

app.get('/opensea-nfts', (req, res) => {
	//request Object into separate variables
	let reqObj = req.body;
	let keyword = reqObj.keyword;

	//initializing call object of call class
	let call = new Call(keyword);

	//Performing Process of the call (Promise with then catch)
	call
		.performProcesses()
		.then((returnObj) => {
			//sending response of returned object

			res.json(returnObj);
		})
		.catch((returnObj) => {
			//sending response of returned object

			res.json(returnObj);
		});
});

// app.post('/run', (req, res) => {
// 	//request Object into separate variables
// 	let reqObj = req.body;
//  	let keyword = reqObj.keyword;

// 	//initializing call object of call class
// 	let call = new Call(keyword);

// 	//Performing Process of the call (Promise with then catch)
// 	call
// 		.performProcesses()
// 		.then((returnObj) => {
// 			//sending response of returned object

// 			res.send(returnObj);
// 		})
// 		.catch((returnObj) => {
// 			//sending response of returned object

// 			res.send(returnObj);
// 		});
// });

app.listen(port, () => {
	console.log(
		new Date().toLocaleString() + ': ',
		`ABC Writer app listening at the http://localhost:${port}`
	);
});
