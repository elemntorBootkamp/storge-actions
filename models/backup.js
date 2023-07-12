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

const Backup = mongoose.model('Backup', backupSchema);

const backups = [
  { siteId: 1, description: 'Backup 1' },
  { siteId: 2, description: 'Backup 2' },
  { siteId: 3, description: 'Backup 3' },
];

// Insert the backup documents into the "storage-action" collection
Backup.insertMany(backups)
  .then(() => {
    mongoose.disconnect();
  })
  .catch((error) => {
    mongoose.disconnect();
    return error;
  });

export default mongoose.model('Backup', backupSchema);
