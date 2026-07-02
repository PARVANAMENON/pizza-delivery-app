const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
        trim:true
    },

    description:{
        type:String,
        required:true
    },

    category:{
        type:String,
        enum:["Veg","Non-Veg"],
        required:true
    },

    size:[
        {
            name:{
                type:String
            },
            price:{
                type:Number
            }
        }
    ],

    image:{
        type:String,
        default:""
    },

    available:{
        type:Boolean,
        default:true
    }

},
{
    timestamps:true
});

module.exports=mongoose.model("Pizza",pizzaSchema);