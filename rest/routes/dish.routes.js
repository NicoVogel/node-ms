const router = require('express').Router()
const dish = require('../controllers/dish.controller.js');

router.post('/', dish.create);
router.get('/', dish.findAll);
router.get('/:id', dish.findOne);
router.put('/:id', dish.update);
router.delete('/:id', dish.delete);


module.exports = router;