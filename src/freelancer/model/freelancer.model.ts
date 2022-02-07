import * as mongoose from 'mongoose';

export const FreelancerSchema = new mongoose.Schema({
  cid: { type: String, index: { required: true, unique: true } },
  name: { type: String, index: { required: true } },
  email: { type: String, index: { required: true, unique: true } },
  password: { type: String, index: { required: true } },
  phone: { type: String, index: { required: true, unique: true } },
});

export const freelancer = mongoose.model('freelancer', FreelancerSchema);
