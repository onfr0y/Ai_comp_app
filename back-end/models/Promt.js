import mongoose from 'mongoose';

const PromptSchema = new mongoose.Schema({
    prompt: {
        type: String,
        required: true,
    }
},
{ timestamps: true }
);

export default mongoose.model('Prompt', PromptSchema);