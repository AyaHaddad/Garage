const mongoose = require('mongoose');

const MONGO_URL = 'mongodb://localhost:27017/garageDB';

const Car = require('../models/Cars');
const User = require('../models/User');



class Controller {
    constructor(){
        this.connect();
    }
    async connect(){
        try {
            await mongoose.connect (MONGO_URL, {
                useNewUrlParser: true
            })
            console.info('connected to bdd');
        } catch(err) {
            console.error(err);
        }
    }

    //Users Queries
    addUser(res, data) {
        User.create(data, (err, newUser) => {
            if (err) throw err;
            res.json({
                status: 200,
                message: 'Created',
                user: newUser
            })
        })
    }

    login(res, data) {
        User.findOne({
            $and: [
                {email: data.email},
                {password: data.password}
            ]
        }, (err, user)=> {
            if (err) throw err;
            res.json({
                status: 200,
                message: 'ok',
                user
            })
        })
    }

    updateUser(res, id, data) {
        User.updateOne({
            _id: id
        }, data , (err, updatedUser) => {
            if (err) throw err;
            res.json({
                status: 200,
                message: 'updated',
                user : updatedUser
            })
    
        })    
    }

    getUser(res, id) {
        User.findOne({
            _id:id
        },  (err, user) => {
            if (err) throw err;
            res.json({
                status: 200,
                message: 'ok',
                user
            })
        })    
    }

    deleteUser(res, id) {
        User.deleteOne({
            _id:id
        },  (err) => {
            if (err) throw err;
            res.json({
                status: 200,
                message: 'Deleted',
            })
        })    
    }

    //Cars Queries
    addCar(res, data) {
        Car.create(data, (err, car) => {
            if (err) throw err;
            res.json({
                status: 200,
                message: 'Created',
                car
            })
        })
    }

    getCars(res, userId) {
        Car.find({
            id_user: userId
        }, (err, cars) => {
            if (err) throw err;
            res.json({
                status: 200,
                message: 'ok',
                cars
            })
        })
    }

    updateCar(res, id, data) {
        Car.updateOne({
            _id: id
        }, data , (err, updatedCar) => {
            if (err) throw err;
            res.json({
                status: 200,
                message: 'updated',
                user : updatedCar
            })
        })    
    }

    deleteCar(res, id) {
        Car.deleteOne({
            _id:id
        },  (err) => {
            if (err) throw err;
            res.json({
                status: 200,
                message: 'Deleted',
            })
        })    
    }

}

exports.DBconfig = new Controller();

/*

mongoose.connect('mongodb://localhost:27017/garageDB', {useNewUrlParser: true}, (err) =>{
    if (!err){
        console.log('connected');
    }
    else console.log('connection failed'+err);
});*/


/*const db = mysql.createConnection({
    type: 'mongoose',
    host: 'localhost',
    username: 'user',
    password: 'root',
    database: 'garage',
})

db.connect((err) =>{
    if (!err){
        console.log('connected');
    }
    else console.log('connection failed'+err);
})

export { db };*/

