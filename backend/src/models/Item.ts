import mongoose from "mongoose";
const {Schema} = mongoose;

const itemSchema = new Schema({
    amount: {
        type: Number,
        default: 1
    },
    order_id: {
        type: String,
        required: true
    },
    product: {
        type: Object,
        require: true
    }
}, {
    timestamps: true
});

const Item = mongoose.model("Item", itemSchema);

export { Item };