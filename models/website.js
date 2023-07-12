import mongoose from 'mongoose';
import { validateDomain, onlyEnglishLetters } from '../services/validate.js';

const websiteSchema = mongoose.Schema({
  managerId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
    validate: {
      validator: (value) => onlyEnglishLetters(value),
      message: 'Only English letters allowed',
    },
  },
  description: {
    type: String,
    required: false,
    validate: {
      validator: (value) => onlyEnglishLetters(value),
      message: 'Only English letters allowed',
    },
  },
  domain: {
    type: Array,
    required: false,
    validate: {
      validator: (value) => validateDomain(value),
      message: 'The domain is ok',
    },
  },
  typeOfDomain: {
    type: String,
    required: false,
  },
  cpu: {
    type: String,
    enum: ['Intel Core i3', 'Intel Core i5', 'Intel Core i7', 'Intel Xeon', 'AMD Ryzen 3', 'AMD Ryzen 5', 'AMD Ryzen 7', 'ARM Cortex-A53', 'ARM Cortex-A72', 'ARM Cortex-A73'],
    required: false,
  },
  memory: {
    type: Number,
    required: false,
  },
  websiteLogo: {
    type: String,
    require: false,
  },
  status:
{
  type: String,
  enum: ['Active', 'About to be active', 'Inactive', 'About to be inactive', 'About to be deleted', 'Deleted'],
  require: true,
},
  owner:
  {
    type: String,
    require: false,
  },
  createdAt:
  {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt:
  {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default mongoose.model('Website', websiteSchema);
