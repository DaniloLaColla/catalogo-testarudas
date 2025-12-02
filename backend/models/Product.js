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
    numericId: {
        type: Number,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Add a virtual 'id' field that maps to 'numericId' for frontend compatibility
productSchema.virtual('id').get(function () {
    return this.numericId;
});

// Ensure virtual fields are serialized
productSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Product', productSchema);
