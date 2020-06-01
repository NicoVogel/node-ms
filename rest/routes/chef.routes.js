const router = require('express').Router()
const chef = require('../controllers/chef.controller.js');

router.post('/', chef.create);
router.get('/', chef.findAll);
router.get('/:id', chef.findOne);
router.put('/:id', chef.update);
router.delete('/:id', chef.delete);


module.exports = router;