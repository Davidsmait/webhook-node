const http = require('http');
const ngrok = require('@ngrok/ngrok');

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 8000
// Setup a webhook route
app.use(bodyParser.json())
app.post('/ultramsgwebhook', (req, res) => {
  console.log(req.body) // print all response

  //messageFrom=req.body['data']['from'] // sender number
  //messageMsg=req.body['data']['body'] // Message text
  res.status(200).end()
})

app.use(bodyParser.json())
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}🚀 `))

// Create webserver
// http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.end('Congrats you have created an ngrok web server');
// }).listen(8080, () => console.log('Node.js web server at 8080 is running...'));

// Get your endpoint online
ngrok.connect({ addr: PORT, authtoken_from_env: true })
    .then(listener => console.log(`Ingress established at: ${listener.url()}`));


