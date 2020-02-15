const express = require("express");
const bodyParser = require("body-parser");
const Mongoc = require("./Database/connection")
const app = express();
const WebHookModel = require("./Database/webHook.model")

Mongoc().then(() => {
    console.log("Connected 100%");
}).catch(console.log)

//parse application/X-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))

//parse application/json
app.use(bodyParser.json())

app.get("/", (req,res) => {
    res.send("Welcome to cyber world new");
    console.log("server is running on http://localhost:9000");
})

//Get All WebHooks
app.get("/api/webhook", (req,res) => {
    WebHookModel
    .find()
    .then((wh) => {

        res.json({
            flag: true,
            data: wh,
            message: "Successfully fetched"
        });
    })
    .catch(e => {
        res.json({
            flag:false,
            data: null,
            message: e.message
        })
    })
});

//add data
app.post("/api/webhook", (req,res) => {
    
    let body = req.body;

    WebHookModel
    .create(body)
    .then((wh) => {

        res.json({
            flag: true,
            data: wh,
            message: "Successfully fetched"
        });
    })
    .catch(e => {
        res.json({
            flag:false,
            data: null,
            message: e.message
        })
    })
});

//Update webhook
app.put("/api/webhook/:id", (req,res) => {
    
    let body = req.body;

    WebHookModel
    .findByIdAndUpdate(req.params.id, body)
    .then((wh) => {

        res.json({
            flag: true,
            data: wh,
            message: "Successfully fetched"
        });
    })
    .catch(e => {
        res.json({
            flag:false,
            data: null,
            message: e.message
        })
    })
});

//Delete
app.delete("/api/webhook/:id", (req,res) => {
    

    WebHookModel
    .findByIdAndUpdate(req.params.id, (err, wh) => {
        if(err) {
            res.json({
                flag: false,
                data: null,
                message: err.message
            })
        }else{
            res.json({
                flag: true,
                data: wh,
                message: "Deleted"
            })
        }
    })

});


app.listen(9000);