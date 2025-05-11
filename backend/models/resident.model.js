import mongoose from "mongoose";

const residentSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    middle_name: { type: String },
    last_name: { type: String, required: true },
    residentPicture: { type: String },
    place_of_birth: { type: String },
    birthday: { type: Date },
    age: { type: String },
    relationship: { type: String },
    singleParent: { type: String },
    civil_status: { type: String },
    gender: { type: String },
    voter_status: { type: String },
    occupation: { type: String },
    education_attainment: { type: String },
    email: { type: String },
    contact_number: { type: String },
    citizenship: { type: String },
    fp_method: { type: String },
    pwd: { type: String },
    fourps: { type: String },
    prev_address: { type: String },
    cur_address: { type: String },
    length_of_stay: { type: String },
    purok: { type: String },
    household_no: { type: String },
    precinct_no: { type: String },
  }, {
    timestamps: true
  });
  
  const Resident = mongoose.model('Resident', residentSchema);
  export default Resident;