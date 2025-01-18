const mongoose = require('mongoose'); 
const { Schema, model } = mongoose;

const orderItemSchema = new Schema({
    product: {type: Map, required: true},
    quantity: {type: Number, default: 1}
});

const OrderSchema = new Schema({  
    user: { type: Map, required: true},
    items: { type: [orderItemSchema], default: []},
    updatedOn: {type: Date},
    createdOn: {type: Date}
});

OrderSchema.pre('save', function(next) {
    this.updatedOn = new Date();
    this.createdOn = new Date(); 
    next();
});
OrderSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();
    delete update._id;
   
    this.updatedOn = new Date();
    next();
});

const OrderModel = model('order', OrderSchema);

module.exports = OrderModel;