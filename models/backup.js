import mongoose from 'mongoose';

const backupSchema = mongoose.Schema({
  backupId: mongoose.Schema.Types.ObjectId,
  siteId: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

export default mongoose.model('Backup', backupSchema);
