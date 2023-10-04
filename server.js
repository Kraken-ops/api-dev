const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Product = require('./models/productModel')
app.use(express.json())
//routes
app.get("/", (req, res) => {
  res.send("Hello Node Api");
});

app.get("/blog", (req, res) => {
  res.send("Hello Blog");
});

app.get('/product',async(req,res) => {
    try {
        const product = await Product.find({});
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : error.message})
    }
})

app.post('/product', async(req,res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : error.message})
    }
})

mongoose
  .connect(
    'mongodb+srv://admin:admin@cluster0.4hf8wsi.mongodb.net/api-dev?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log(`Node Api app is running on port 3000`);
    })
  })
  .catch((err) => console.log(err));