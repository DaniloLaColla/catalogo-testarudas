const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const resetDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const result = await Product.deleteMany({});
        console.log(`Deleted ${result.deletedCount} products.`);

        console.log('Database reset complete');
        process.exit(0);
    } catch (err) {
        console.error('Reset failed:', err);
        process.exit(1);
    }
};

resetDb();
