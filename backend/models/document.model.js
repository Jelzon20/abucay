import mongoose from 'mongoose';


const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true
    }, 
    description: {
        type: String,
    },
    files: {
        type: [String]
    }, 

}, {timestamps: true}
);

const Document = mongoose.model('Document', documentSchema);

export default Document;