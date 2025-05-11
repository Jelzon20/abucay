import mongoose from 'mongoose';

const BarangayOfficialSchema = new mongoose.Schema({
  officialPicture: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  additionalDetails: {
    type: String,
    required: false,
  },
  position: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  term: {
    type: String,
    required: true,
  },
});

const Officials = mongoose.model('BarangayOfficial', BarangayOfficialSchema);
export default Officials;
