import mongoose from "mongoose";

const {Schema} = mongoose

const itemSchema = new Schema({
    code: {
        type: String, 
        required: true,
    },
    itemName: {
        type: String,
        unique: true,
        required: true,
    },
    itemValue: {
        type: Number, 
        required: true,
    },
}, {timestamps: true})

let itemModel
try {
    itemModel = mongoose.model('K_maistas')
} catch (error) {
    itemModel = mongoose.model('K_maistas', itemSchema)
}
export default itemModel