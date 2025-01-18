const {Schema,model} = require('mongoose');
const { addListener } = require('./cart_model');

const categorySchema = new Schema({
    title: {type: String, required: [true, 'title is required']},
    description: {type: String, default:""},
    updatedOn: {type: Date},
    createdOn: {type: Date}
});

categorySchema.pre('save', function(next){
    this.updatedOn = new Date();
    this.createdOn = new Date();

    next();
});

categorySchema.pre(['update', 'findOneAndUpdate','updateOne'], function(next){
    const update = this.getUpdate();
    delete update._id;

    this.updatedOn = new Date();
});

const CategoryModel = model('Category', categorySchema);

module.exports = CategoryModel;