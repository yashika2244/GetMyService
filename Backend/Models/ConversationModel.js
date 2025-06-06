import mongoose from 'mongoose'
import MessageModel from './MessageModel.js'
import UserModels from '../Models/UserModels.js'


const conversationSchema = new mongoose.Schema({
    participants:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    messages:[{type:mongoose.Schema.Types.ObjectId, ref:"Messages", default:[]}],

},
{
    timestamps:true,
}
)


export default mongoose.model("Conversation", conversationSchema);