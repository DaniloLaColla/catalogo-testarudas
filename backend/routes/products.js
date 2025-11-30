const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { readProducts, writeProducts } = require('../utils/db');
const { upload } = require('../utils/cloudinary');

// GET all products
router.get('/', (req, res) => {
  const products = readProducts();
  res.json(products);
});

// GET single product
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const products = readProducts();
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
});

// POST new product (Admin only - simplified auth for now)
router.post('/', upload.single('image'), (req, res) => {
  const { type, description, price, uploadedBy } = req.body;

  if (!type || !price || !req.file || !uploadedBy) {
    return res.status(400).json({ message: 'Type, price, image, and uploadedBy are required' });
  }

  const products = readProducts();

  // Generate sequential ID
  let nextId = 1;
  if (products.length > 0) {
    // Filter out legacy timestamp IDs (assuming they are large numbers) if mixed data exists
    // Or just find the max ID that is a simple number
    const ids = products.map(p => parseInt(p.id)).filter(id => !isNaN(id) && id < 1000000000000);
    if (ids.length > 0) {
      nextId = Math.max(...ids) + 1;
    }
  }

  const newProduct = {
    id: nextId.toString(),
    type,
    description,
    price: parseFloat(price),
    uploadedBy,
    image: req.file ? req.file.path : '' // Cloudinary returns the full URL in path
  };

  products.push(newProduct);
  writeProducts(products);

  res.status(201).json(newProduct);
});

// DELETE product
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let products = readProducts();

  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  // Optional: Delete image from Cloudinary (TODO)
  // const product = products[productIndex];
  // if (product.image) {
  //   // Logic to delete from Cloudinary would go here
  // }

  products = products.filter(p => p.id !== id);
  writeProducts(products);

  res.json({ message: 'Product deleted' });
});

module.exports = router;
