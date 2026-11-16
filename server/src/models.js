const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name:{type:String,required:true,trim:true}, email:{type:String,required:true,unique:true,lowercase:true,trim:true},
  passwordHash:{type:String,required:true}, role:{type:String,enum:['admin','caller'],default:'caller'},
  group:{type:String,default:'General',trim:true}, active:{type:Boolean,default:true}
},{timestamps:true});
const callSchema = new mongoose.Schema({
  caller:{type:mongoose.Schema.Types.ObjectId,ref:'User'}, attempt:{type:Number,required:true},
  status:{type:String,enum:['pending','successful','unsuccessful','registered_website','applied_vision2050'],required:true},
  remarks:{type:String,default:''}, calledAt:{type:Date,default:Date.now}, followUpAt:{type:Date}
},{_id:true});
const leadSchema = new mongoose.Schema({
  sourceTimestamp:{type:String,default:''}, name:{type:String,required:true,trim:true},
  phone:{type:String,required:true,index:true}, email:{type:String,default:''},
  age:{type:String,default:''}, profession:{type:String,default:''}, organisation:{type:String,default:''},
  problem:{type:String,default:''}, suggestion:{type:String,default:''},
  campaign:{type:String,default:'Vision Mysore 2050'}, assignedTo:{type:mongoose.Schema.Types.ObjectId,ref:'User',default:null},
  attempts:{type:Number,default:0,min:0}, status:{type:String,enum:['pending','successful','unsuccessful','registered_website','applied_vision2050'],default:'pending'},
  lastCalledAt:{type:Date,default:null}, lastRemarks:{type:String,default:''}, followUpAt:{type:Date,default:null},
  calls:[callSchema], importedAt:{type:Date,default:Date.now}
},{timestamps:true});
leadSchema.index({phone:1,campaign:1},{unique:true});
const User=mongoose.model('User',userSchema), Lead=mongoose.model('Lead',leadSchema);
module.exports={User,Lead};
