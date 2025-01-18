const mongoose = require('mongoose'); 
const { Schema, model } = mongoose;

const cartItemSchema = new Schema({
    product: {type: Schema.Types.ObjectId, ref: 'Product'},
    quantity: {type: Number, default: 1}
});

const CartSchema = new Schema({  
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    items: { type: [], default: []},
    updatedOn: {type: Date},
    createdOn: {type: Date}
});

CartSchema.pre('save', function(next) {
    this.updatedOn = new Date();
    this.createdOn = new Date(); 
    next();
});
CartSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();
    delete update._id;
   
    this.updatedOn = new Date();
    next();
});

const CartModel = model('Cart', CartSchema);

module.exports = CartModel;