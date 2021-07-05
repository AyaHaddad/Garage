const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarsSchema = new Schema ({
    brand: String,
    code: String,
    state:{
        type: Boolean,
        default: false
    },
    id_user: {
        ref: 'User',
        type: Schema.Types.ObjectId
    }
})

var Car = mongoose.model('Car', CarsSchema );

module.exports = Car;



/*const mongoose = require('mongoose');

var carsSchema = new mongoose.Schema({
    brand: {
        type : String
    },
    code: {
        type : String
    },

});

mongoose.model('Car', carsSchema );*/