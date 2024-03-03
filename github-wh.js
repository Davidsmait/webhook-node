const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const port = 3000;
const ngrok = require('@ngrok/ngrok');


app.use(express.json());

let events = [];

app.post("/hook", (req, res) => {
    console.log("Capture event of Github WebHook");
    console.log(":D");
    events.push(req.body);
    return res.status(200).end();
});

app.get("/events", (req, res) => {
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
    console.log("challenge: ", challenge)
    if (mode && token) {
        // Check the mode and token sent is coçrrect
        if (mode === "subscribe" ) {
            // Respond with the challenge token from the request
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            // Respond with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});

app.listen(port, () => {
    console.log(`Server listen on http://localhost:${port}`);
});

// Get your endpoint online
ngrok.connect({ addr: port, authtoken_from_env: true })
    .then(listener => console.log(`Ingress established at: ${listener.url()}`));


