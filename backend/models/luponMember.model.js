// modules/luponMember/luponMember.model.js
import mongoose from 'mongoose';

const luponMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact_number: String,
}, {
  timestamps: true,
});

const LuponMembers = mongoose.model('LuponMember', luponMemberSchema);

export default LuponMembers;
