const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { readProducts, writeProducts } = require('../utils/db');

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

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
  const { name, description, price, uploadedBy } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';

  if (!name || !price || !req.file || !uploadedBy) {
    return res.status(400).json({ message: 'Name, price, image, and uploadedBy are required' });
  }

  const products = readProducts();
  const newProduct = {
    id: Date.now().toString(),
    name,
    description,
    price: parseFloat(price),
    uploadedBy,
    image
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

  // Optional: Delete image file
  const product = products[productIndex];
  if (product.image) {
    const imagePath = path.join(__dirname, '..', product.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  products = products.filter(p => p.id !== id);
  writeProducts(products);

  res.json({ message: 'Product deleted' });
});

module.exports = router;
