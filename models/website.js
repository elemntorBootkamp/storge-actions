import mongoose from 'mongoose';
import { validateDomain, onlyEnglishLetters } from '../services/validate.js';
import { WebStatusEnum, cpuEnum } from '../enums/website.js';

const websiteSchema = mongoose.Schema({
  managerId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    validate: {
      validator: (value) => onlyEnglishLetters(value),
      message: 'Only English letters allowed',
    },
  },
  description: {
    type: String,
    required: true,
    validate: {
      validator: (value) => onlyEnglishLetters(value),
      message: 'Only English letters allowed',
    },
  },
  domain: {
    type: Array,
    required: true,
    validate: {
      validator: (value) => validateDomain(value),
      message: 'The domain is ok',
    },
  },
  typeOfDomain: {
    type: String,
    required: true,
  },
  cpu: {
    type: String,
    enum: Object.values(cpuEnum),
    required: true,
  },
  memory: {
    type: Number,
    required: true,
  },
  websiteLogo: {
    type: String,
    required: true,
  },
  status:
{
  type: String,
  enum: Object.values(WebStatusEnum),
  required: true,
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
