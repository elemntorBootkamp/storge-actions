import Website from './models/website';
import Backup from './models/backup';

export const backupSite = async (data) => {
  const website = data.data;
  // Create a new instance of the Website model
  const newWebsite = new Website({
    title: website.title,
    description: website.description,
    domain: website.domain,
    typeOfDomain: website.typeOfDomain,
    cpu: website.cpu,
    memory: website.memory,
    status: 'pending',
  });

  const newBackup = new Backup({
    siteId: newWebsite.id,
    description: website.description,
  });

  // Save the new website to the database
  await newWebsite.save();

  await newBackup.save();
  console.log('Website copied successfully');
};
() => true;
