import mongoose from "mongoose";
const orderSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    orderId :{
        type:String,
        unique:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    product_details:{
        _id:String,
        unique:true
    },
   paymentId:{
    type:String,
   } ,
   payement_status:{
    type:String,
    default:""
   },
   delivery_address:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"address"
   },
   subTotalamy:{
    type:Number,
    default:0
   },
   totalAmt:{
    type:Number,
    default:0
   },
   invoice_receipt:{
    type:String,
    default:""
   }
},{timestamps:true});

const OrderModel=mongoose.model("order",orderSchema);
export default OrderModel;