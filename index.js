const PORT = process.env.PORT || 8000
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const axios = require('axios')
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(cors())

// Connect to MongoDB
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true 

}).then(() => {
    console.log("Connected to MongoDB database PricesMX");
    //Start app server
    app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
}).catch(err => {
    console.log(`Error trying to connect to Mongo DB` , err)
    process.exit(1)
});

//Import Database Model
const Prices = require('./models/prices_model');

// Retrieve all prices
app.get('/year_2023', async (req, res) => {
  const {product, presentation, brand, storeName, state, city} = req.query
  try {
    let query = {}
    if (product) query.product = { $regex: product, $options: 'i' }
    if (presentation) query.presentation = {$regex: presentation, $options: 'i'}
    if (brand) query.brand = { $regex: brand, $options: 'i' }
    if (storeName) query.storeName = { $regex: storeName, $options: 'i' }
    if (state) query.state = { $regex: state, $options: 'i'}
    if (city) query.city = { $regex: city, $options: 'i' }
    const prices = await Prices.find(query)
    res.json(prices)
  } catch (error) {
    console.error(error)
    res.status(500).send("Error trying to get prices.")
  }
})

// Retrieve prices by brand name (case-insensitive)
app.get('/year_2023/brand', async (req, res) => {
    const { brand } = req.query;
    try {
      const pricesByBrand = await Prices.find({ brand: { $regex: brand, $options: 'i' } });
      res.json(pricesByBrand);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error trying to get prices by brand.");
    }
  })

// Retrieve prices by brand and product
app.get('/year_2023/brand-product', async (req, res) => {
    const { brand, product } = req.query;
    try {
      const pricesByBrandAndProduct = await Prices.find({
        brand: { $regex: brand, $options: 'i' },
        product: { $regex: product, $options: 'i' },
      });
      res.json(pricesByBrandAndProduct);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error trying to get prices by brand and product.");
    }
  })

//Save a single product for testing
app.post('/year_2023', async (req, res) => {
	const prices = new Prices({ 
    _id: new mongoose.Types.ObjectId(),
    product: req.body.product,
    presentation: req.body.presentation,
	brand: req.body.brand,
	department: req.body.department,
	catalog: req.body.catalog,
	price: req.body.price,
	date: req.body.date,
	retailer: req.body.retailer,
    businessType: req.body.businessType,
    storeName: req.body.storeName,
	address: req.body.address,
    state: req.body.state,
    city: req.body.city,
    latitude: req.body.latitude,
    longitude: req.body.longitude
	})
	await prices.save();
	res.json(prices);
})

//Delete specific product/price by id
app.delete('/year_2023/delete-product/:id', async (req, res) => {
	const result = await Prices.findByIdAndDelete(req.params.id)
	res.json({result})
})

