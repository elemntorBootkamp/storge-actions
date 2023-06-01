const Backup = require("../models/backup")



module.exports = {


    getAllBackups: (req, res) => {
        Backup.find()
            .then((backups) => { res.status(200).send({ backups }) })
            .catch((error) => { res.status(404).send({ message: error.message }) })
    },


    
    addBackup: async(req,res)=> {
      const backup= await new Backup(req.body);
        try{
            await backup.save()
            res.status(200).send(backup)
        }
        catch(err){
            res.status(404).send(err)
        }
      }       
}