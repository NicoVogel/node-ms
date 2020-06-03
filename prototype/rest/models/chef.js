const mongo = require('mongoose');
const Schema = mongo.Schema;

/**
 * @swagger
*  components:
*    schemas:
*      Chef:
*        type: object
*        required:
*          - name
*          - rating
*        properties:
*          name:
*            type: string
*          rating:
*            type: number
*            description: Rating from 0-10
*        example:
*          name: Leonardo
*          rating: 10
*/

const chefSchema = new Schema({
  name: String,
  rating: Number
});

module.exports = mongo.model('Chef', chefSchema);