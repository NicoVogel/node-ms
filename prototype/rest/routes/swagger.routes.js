const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const router = require('express').Router();

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "node-ms-rest",
      version: "1.0.0",
      description:
        "A test project to test RESTful HTTP",
      license: {
        name: "MIT",
        url: "https://choosealicense.com/licenses/mit/"
      },
    },
    servers: [
      {
        url: "http://localhost:3000/"
      }
    ]
  },
  apis: ["routes/*", "models/*"]
};
const specs = swaggerJsdoc(options);
router.use("/", swaggerUi.serve);
router.get(
  "/",
  swaggerUi.setup(specs, {
    explorer: true
  })
);

module.exports = router;

