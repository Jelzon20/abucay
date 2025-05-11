import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema({
  requestor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resident', // assuming your model is named 'Resident'
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Certificate = mongoose.model('Certificate', CertificateSchema);
export default Certificate;
