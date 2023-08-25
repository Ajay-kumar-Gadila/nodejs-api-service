const mongoose = require('mongoose');
const BrandName = mongoose.Schema({
    brandname : {
        type : String,
        required:true,
      }
    
});

module.exports = mongoose.model('brand',BrandName);

