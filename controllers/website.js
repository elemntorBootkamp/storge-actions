const website= require("../models/website")


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
     * -----------title:
     * -------------type: String
     * -------------descraption: The title of the website
     * -----------descraption:
     * -------------type:String
     * -------------descraption: The descraption of the website
     * -----------domain:
     * -------------type:Array
     * -------------descraption: The domain of the website
     * -----------typeOfDomain:
     * -------------type:String
     * -------------descraption: The type of the domain of the website
     * -----------cpu:
     * -------------type:String
     * -------------descraption: The cpu of the website
     *-----------memory:
     * -------------type:String
     * -------------descraption: The memory of the website
     * -----------status:
     * -------------type:String
     * -------------descraption: The status of the website
     */

     /**
      * @swagger
      * tags:
      * --name:website
      * --descraption: The website managing API
      * 
      */

     /**
      * @swagger
      * /website:
      * --get:
      * ----summary: Return the list of all websites
      * ----tags: [website]
      * ----responses:
      * ------200:
      * --------descraption: The list of the websits
      * --------content:
      * ----------application/json:
      * ------------schema:
      * --------------type:array
      * --------------items:
      * ----------------$ref: '#/components/schemas/website'
      */

    getAllWebsites: (req, res) => {
        User.find()
            .then((websites) => { res.status(200).send({ websites }) })
            .catch((error) => { res.status(404).send({ message: error.message }) })
    },

    /**
     * @swagger
     * /website/add:
     * --post:
     * ----summary: Add a new website
     * ----tags: [website]
     * ----requestBody:
     * ------content:
     * --------application/json:
     * ----------schema:
     * ------------$ref: '#/components/schemas/website'
     * ----responses:
     * ------200:
     * --------descraption: The website was successfully created
     * --------content:
     * ----------application/json
     * ------------schema:
     * --------------$ref: '#/components/schemas/website'
     * ------500:
     * --------descraption: Some server error
     * 
     */

    addWebsite:(req,res)=> {
        const website= new website(req.body);
        website.save(function(error) { 
              if (error)
                  res.status(404).send(err)
            else
            res.status(200).send(website)
           })
        }
    ,
    tryTest:()=>{
        return true;
    }
}