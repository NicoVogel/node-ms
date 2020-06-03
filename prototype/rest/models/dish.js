const mongo = require('mongoose');
const Schema = mongo.Schema;
/**
 * @swagger
*  components:
*    schemas:
*      Dish: 
*        type: object
*        required:
*          - name
*          - country
*          - tasty
*          - chefsId
*        properties:
*          name:
*            type: string
*          country:
*            type: string
*            description: IEC Country Code
*          tasty:
*            type: boolean
*          chefsId:
*            type: String
*        example:
*          name: Spaghetti
*          country: DE
*          tasty: true
*          chefsId: 1
 */
const dishSchema = new Schema({
  name: String,
  country: String,
  tasty: Boolean,
  chefsId: String
});

module.exports = mongo.model('Dish', dishSchema);