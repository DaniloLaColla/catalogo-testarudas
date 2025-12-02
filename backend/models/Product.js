const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    uploadedBy: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Add a virtual 'id' field that maps to '_id' for frontend compatibility
productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialized
productSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Product', productSchema);
