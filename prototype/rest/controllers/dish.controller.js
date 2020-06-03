const Dish = require('../models/dish');

exports.create = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send();
  }
  const dish = new Dish({
    name: req.body.name,
    country: req.body.country,
    tasty: req.body.tasty,
    chefsId: req.body.chefsId
  });

  dish.save().then(data => res.send(data)).catch(err => res.status(500).send());
}

exports.findAll = (req, res) => {
  Dish.find()
    .then(dishs => {
      res.send(dishs);
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}

exports.findOne = (req, res) => {
  Dish.findById(req.params.id)
    .then(dish => {
      if (!dish) {
        return res.status(404).send({
          message: "dish not found with id " + req.params.id
        });
      }
      res.send(dish);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "dish not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error retrieving dish with id " + req.params.id
      });
    });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body.name) {
    return res.status(400).send();
  }

  // Find note and update it with the request body
  Dish.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    country: req.body.country,
    tasty: req.body.tasty,
    chefsId: req.body.chefsId
  }, { new: true })
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Dish not found with id " + req.params.id
        });
      }
      res.send(note);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Dish not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error updating note with id " + req.params.id
      });
    });
};

exports.delete = (req, res) => {
  Dish.findByIdAndRemove(req.params.id)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Dish not found with id " + req.params.id
        });
      }
      res.send({ message: "Dish deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Dish not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.id
      });
    });
};