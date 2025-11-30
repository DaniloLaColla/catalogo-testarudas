const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/products.json');

const readProducts = () => {
    if (!fs.existsSync(dataPath)) {
        return [];
    }
    const data = fs.readFileSync(dataPath, 'utf8');
    try {
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const writeProducts = (products) => {
    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
};

module.exports = { readProducts, writeProducts };
