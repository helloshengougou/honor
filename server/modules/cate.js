const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name: String,
    parent: {type: mongoose.SchemaTypes.ObjectId,ref: 'cate'}
})

module.exports = mongoose.model('cate',schema)