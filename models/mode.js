const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentModeSchema = new Schema({
    mode: {
        type: String,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        type: String,
        require: true
    }
}, {timestamps: true});

const PaymentMode = mongoose.model('PaymentMode', PaymentModeSchema);

module.exports = PaymentMode;