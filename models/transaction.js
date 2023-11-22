const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    datetime: {
        type: Date,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    remark: {
        type: String,
        require: false
    },
    cashType: {
        type: String,
        require: true
    },
    paymentMode: {
        type: Schema.Types.ObjectId,
        ref: "PaymentMode",
        require: false
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        require: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        type: String,
        require: true
    }
})

const transaction = mongoose.model('Transaction', transactionSchema);

module.exports = transaction;