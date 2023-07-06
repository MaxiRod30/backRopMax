import mongoose from "mongoose";

const productsCollection = "products";

const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true,'El title es obligatorio']
    },
    description: {
        type: String,
        required: [true,'La description es obligatorio'],
    },
    price: {
        type: Number,
        required: [true,'El price es obligatorio']
    },
    thumbnail: {
        type: Array,
    },
    code: {
        type: String,
        required: [true,'El code es obligatorio'],
        unique: true
    },
    stock: {
        type: Number,
        required: [true,'El stock es obligatorio']
    },
    category: {
        type: String,
        required: [true,'El category es obligatorio']
    },
    status: {
        type: Boolean,
        default: true
    }
});

const productModel = mongoose.model(productsCollection, productSchema);

export default productModel;