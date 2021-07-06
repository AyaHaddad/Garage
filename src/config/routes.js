const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const jsonParser = bodyParser.json()
const { DBconfig } = require('./DBconfig');

app.use(bodyParser.json());
app.use(cors());

 
//Users Routes
app.post('/api/users', jsonParser, (req, res) => {
    let data = req.body;
    console.log(DBconfig);
    DBconfig.addUser(res, data);
})

app.post('/api/login', jsonParser, (req, res) => {
    let data = req.body;
    DBconfig.login(res, data);
})

app.put('/api/users/:id', jsonParser, (req, res) => {
    let {id} = req.params;
    let data = req.body;
    DBconfig.updateUser(res, id, data);
})

app.get('/api/users/:id', jsonParser, (req, res) => {
    let {id} = req.params;
    DBconfig.getUser(res, id);
})

app.delete('/api/users/:id', jsonParser, (req, res) => {
    let {id} = req.params;
    DBconfig.deleteUser(res, id);
})

//Cars Routes

app.post('/api/cars/:userId', jsonParser, (req, res) => {
    let data = req.body;
    let {userId} = req.params;
    data.id_user = userId;
    DBconfig.addCar(res, data);
})

app.get('/api/cars/:userId', jsonParser, (req, res) => {
    let {userId} = req.params;
    DBconfig.getCars(res, userId);
})

app.put('/api/cars/:id', jsonParser, (req, res) => {
    let {id} = req.params;
    let data = req.body;
    DBconfig.updateCar(res, id, data);
})

app.delete('/api/cars/:id', jsonParser, (req, res) => {
    let {id} = req.params;
    DBconfig.deleteCar(res, id);
})


exports.app = app;
