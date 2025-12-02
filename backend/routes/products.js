const express = require('express');
const router = express.Router();
const multer = require('multer');
const { upload } = require('../utils/cloudinary');
const Product = require('../models/Product');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new product
router.post('/', upload.single('image'), async (req, res) => {
  const { type, description, price, uploadedBy } = req.body;

  console.log('Received product upload request');
  console.log('Body:', req.body);
  console.log('File:', req.file);

  if (!type || !price || !req.file || !uploadedBy) {
    const missing = [];
    if (!type) missing.push('type');
    if (!price) missing.push('price');
    if (!req.file) missing.push('image');
    if (!uploadedBy) missing.push('uploadedBy');
    console.error('Missing fields:', missing);
    return res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}` });
  }

  const product = new Product({
    type,
    description,
    price: parseFloat(price),
    uploadedBy,
    image: req.file.path
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // TODO: Delete image from Cloudinary

    await product.deleteOne();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
