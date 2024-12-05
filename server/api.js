var express = require('express');
var cors = require('cors');
var mongoClient = require('mongodb').MongoClient; // Capitalize 'MongoClient'

var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var conString = "mongodb://127.0.0.1:27017";

app.get('/users', (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        let database = clientObject.db("TODO");
        database.collection("users").find({}).toArray().then(document => {
            res.send(document);
            res.end()
        })
    })
})

app.get('/appointments/:userId', (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("TODO"); // here should be database name 
        database.collection("appointments").find({ userId: req.params.userId }).toArray().then(documents => { // and here should be collection name 
            res.send(documents);
            res.end();
        });
    }).catch(err => {
        console.error("Failed to connect to MongoDB", err);
        res.status(500).send("Internal Server Error");
    });
});


app.get('/get-task/:id', (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("TODO"); // here should be database name 
        database.collection("appointments").find({ appointment_id: parseInt(req.params.id) }).toArray().then(documents => { // and here should be collection name 
            res.send(documents);
            res.end();
        });
    }).catch(err => {
        console.error("Failed to connect to MongoDB", err);
        res.status(500).send("Internal Server Error");
    });
});

app.post('/register-user', (req, res) => {
    let user = {
        userId: req.body.userId,
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        mobile: req.body.mobile
    }

    mongoClient.connect(conString).then(clientObject => {
        let database = clientObject.db('TODO');
        database.collection("users").insertOne(user).then(() => {
            console.log("User Added !");
            res.end()
        })
    })
})

app.post('/add-task', (req, res) => {
    let task = {
        appointment_id: parseInt(req.body.appointment_id),
        title: req.body.title,
        description: req.body.description,
        Date: new Date(req.body.Date),
        userId: req.body.userId
    }
    mongoClient.connect(conString).then(clientObject => {
        let database = clientObject.db("TODO");
        database.collection("appointments").insertOne(task).then(() => {
            console.log("appointment added !");
            res.end();
        })
    })
})

app.put('/edit-task/:id', (req, res) => {
    let id = parseInt(req.params.id);
    mongoClient.connect(conString).then(clientObject => {
        let database = clientObject.db("TODO");
        database.collection("appointments").updateOne({ appointment_id: id }, {
            $set:
            {
                appointment_id: id,
                title: req.body.title,
                description: req.body.description,
                Date: new Date(req.body.Date),
                userId: req.body.userId
            }
        }).then(() => {
            console.log("Updated !");
            res.end();
        })
    })
})

app.delete('/delete-task/:id', (req, res) => {
    let id = parseInt(req.params.id)
    mongoClient.connect(conString).then(clientObject => {
        let database = clientObject.db('TODO');
        database.collection("appointments").deleteOne({ appointment_id: id }).then(() => {
            console.log("task deleted !");
            res.end();
        })
    })
})

app.listen(7000, () => {
    console.log("App listening on port 7000");
});


