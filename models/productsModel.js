const mongoose = require('../bin/mongodb')
const errorMessage = require('../util/errorMessage')
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, errorMessage.GENERAL.campo_obligatorio],
        minlength: [3, errorMessage.GENERAL.minlength]
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "categories"
    },
    sku: String,
    description: String,
    price: {
        type: Number,
        min: 1
    },
    destacado: Boolean

})
productSchema.statics.findByIdAndValidate = async function(id) {
    const document = await this.findById(id);
    if (!document) {
        return {
            error: true,
            message: "No existe ese producto"
        }
    }
    return document;
}
module.exports = mongoose.model('products', productSchema);