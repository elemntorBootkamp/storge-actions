const beckup= require("../models/backup")


module.exports = {

    /**
     * @swagger
     * ---components:
     * -----schemas:
     * -------website:
     * ---------type:Object
     * ---------required:
     * 
     * ---------properties:
     * -----------siteId:
     * -------------type: String
     * -------------descraption: The siteId of the backup
     * -----------descraption:
     * -------------type: String
     * -------------descraption: The descraption of the backup
     */

    /**
      * @swagger
      * tags:
      * --name:backup
      * --descraption: The backup managing API
      * 
      */

    /**
      * @swagger
      * /backup:
      * --get:
      * ----summary: Return the list of all backups
      * ----tags: [backup]
      * ----responses:
      * ------200:
      * --------descraption: The list of the backups
      * --------content:
      * ----------application/json:
      * ------------schema:
      * --------------type:array
      * --------------items:
      * ----------------$ref: '#/components/schemas/backup'
      */

    getAllBackups: (req, res) => {
        User.find()
            .then((beckups) => { res.status(200).send({ beckups }) })
            .catch((error) => { res.status(404).send({ message: error.message }) })
    },

    /**
     * @swagger
     * /backup/add:
     * --post:
     * ----summary: Add a new backup
     * ----tags: [backup]
     * ----requestBody:
     * ------content:
     * --------application/json:
     * ----------schema:
     * ------------$ref: '#/components/schemas/backup'
     * ----responses:
     * ------200:
     * --------descraption: The backup was successfully created
     * --------content:
     * ----------application/json
     * ------------schema:
     * --------------$ref: '#/components/schemas/backup'
     * ------500:
     * --------descraption: Some server error
     * 
     */
    addBackup:(req,res)=> {
        const beckups= new beckups(req.body);
        beckups.save(function(error) { 
              if (error)
                  res.status(404).send(err)
            else
            res.status(200).send(website)
           })
        }
}