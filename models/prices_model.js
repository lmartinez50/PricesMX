const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema definition
const pricesSchema = new Schema({
    _id: Schema.Types.ObjectId,
    product: {
        type: String,
        unique: true,
        required: true,
    },
    presentation: {
		  type: String,
		  required: true
	},
    brand: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    catalog: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    retailer: {
        type: String,
        required: true
    },
    businessType: {
        type: String,
        required: true
    },
    storeName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
})

//Export model. Use the name of the collection
const Prices = mongoose.model("year_2023", pricesSchema)  
module.exports = Prices;