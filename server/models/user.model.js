import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
       name:{
        type:String,
       },
       email:{
        type:String,
        unique:true
       }, 
       password:{
        type:String
       },
       avatar:{
        type:String,
        default:""
       },
       mobile:{
        type:String
       },
       refresh_token:{
        type:String,
        default:""
       },
       verify_email:{
        type:Boolean,
        default:false
       },
       last_login_date:{
        type:Date,
        default:""
       },
       status:{
        type:String,
       enum:["Active","Inactive","Suspended"],
       default:"Active"
       },
       address_details:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"address"
       }],
       shopping_cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cart"
       }],
       orderHistrory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"order"
       }],
       forgot_password_otp:{
        type:String,
        default:null
       },
       forgot_password_expiry:{
        type:Date,
        default:""
       },
       role:{
        type:String,
        enum:["User","Admin"],
        default:"User"
       },


     
},{timestamps:true});

const UserModel=mongoose.model("user",userSchema);
export default UserModel;