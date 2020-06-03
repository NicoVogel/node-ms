const Chef = require('../models/chef');

exports.create = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send();
  }
  const chef = new Chef({
    name: req.body.name,
    rating: req.body.rating
  });

  chef.save().then(data => res.send(data)).catch(err => res.status(500).send());
}

exports.findAll = (req, res) => {
  Chef.find()
    .then(chefs => {
      res.send(chefs);
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}

exports.findOne = (req, res) => {
  Chef.findById(req.params.id)
    .then(chef => {
      if (!chef) {
        return res.status(404).send({
          message: "chef not found with id " + req.params.id
        });
      }
      res.send(chef);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "chef not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error retrieving chef with id " + req.params.id
      });
    });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body.name) {
    return res.status(400).send();
  }

  // Find note and update it with the request body
  Chef.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    rating: req.body.rating
  }, { new: true })
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Chef not found with id " + req.params.id
        });
      }
      res.send(note);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Chef not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error updating note with id " + req.params.id
      });
    });
};

exports.delete = (req, res) => {
  Chef.findByIdAndRemove(req.params.id)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Chef not found with id " + req.params.id
        });
      }
      res.send({ message: "Chef deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Chef not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.id
      });
    });
};