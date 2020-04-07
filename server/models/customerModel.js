const mongoose= require('mongoose');

var Schema = mongoose.Schema;

var customerSchema = new Schema({
    id :{
        type:String,
    },
    name:{
        type:String,
    },
    phone:{
        type:String,
    },
    address : {
        type: String
    },
    membership: {
        type :String,
    },
    isDelete:{
        type:Boolean,
        default:false
    }  
}, { timestamps:false}, { versionKey: true});

module.exports = mongoose.model('customer',customerSchema);