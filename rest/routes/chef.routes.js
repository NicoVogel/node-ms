const router = require('express').Router()
const chef = require('../controllers/chef.controller.js');

/**
 * @swagger
 * tags:
 *   name: Chef
 *   description: Chef management
 */

/**
 * @swagger
*path:
*  /chef/:
*    post:
*      summary: Create a new chef
*      tags:
*        - Chef
*      requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Chef'
*      responses:
*        '200':
*          description: A user schema
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Chef'
*    get:
*      summary: Retrieve all chefs
*      tags:
*        - Chef
*      responses:
*        '200':
*          description: A list of chefs
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Chef'
*  '/chef/{id}':
*    delete:
*      summary: Delete chef
*      tags:
*        - Chef
*      responses:
*        '200':
*          description: Chef deleted
*          content:
*            text/plain:
*              schema:
*                type: string
*                example: Chef deleted successfully!
*    put:
*      summary: Update chef
*      tags:
*        - Chef
*      requestBody:
*        required: false
*      responses:
*        '200':
*          description: Chef updated
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Chef'
*    get:
*      summary: Retrieve single chef
*      tags:
*        - Chef
*      requestBody:
*        required: false
*      responses:
*        '200':
*          description: Chef retrieved
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Chef'
 * 
 */

router.post('/', chef.create);
router.get('/', chef.findAll);
router.get('/:id', chef.findOne);
router.put('/:id', chef.update);
router.delete('/:id', chef.delete);


module.exports = router;