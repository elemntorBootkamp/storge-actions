import mongoose from 'mongoose';

const websiteSchema = mongoose.Schema({
  title: {
    type: String,
    require: false,
  },
  description: {
    type: String,
    require: false,
  },
  domain: {
    type: Array,
    require: false,
  },
  typeOfDomain: {
    type: String,
    require: false,
  },
  cpu: {
    type: String,
    require: false,
  },
  memory: {
    type: Number,
    require: false,
  },
  status: {
    type: Number,
    require: false,
  },
});

export default mongoose.model('Website', websiteSchema);
