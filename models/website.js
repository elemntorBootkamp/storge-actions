import mongoose from 'mongoose';

const websiteSchema = mongoose.Schema({
  managerId: {
    type: Number,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  domain: {
    type: Array,
    require: true,
  },
  typeOfDomain: {
    type: String,
    require: true,
  },
  cpu: {
    type: String,
    require: true,
  },
  memory: {
    type: Number,
    require: true,
  },
  status: {
    type: Number,
    require: true,
  },
  websiteLogo: {
    type: String,
    require: true,
  },

});

export default mongoose.model('Website', websiteSchema);
