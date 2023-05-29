import mongoose from "mongoose";
const {Schema} = mongoose;

const orderSchema = new Schema({
    table: {
        type: Number,
        require: true
    },
    status: {
        type: Boolean,
        default: false
    },
    draft: {
        type: Boolean,
        default: true
    },
    name: {
        type: String,
        require: false
    }
},{
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema);

export {Order};