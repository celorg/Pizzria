import mongoose from "mongoose";

const {Schema} = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: mongoose.Types.Decimal128,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    banner: {
        type: String
    },
    category: {
        type: Object,
        required: true
    }
}, {
    timestamps: true
})

const Product = mongoose.model("Product", productSchema);

export { Product }