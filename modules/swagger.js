const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "멍멍냥냥",
      version: "1.0.0",
      description: "멍멍냥냥 API with express",
    },
    host: "localhost:3000",
    basePath: "/",
  },
  apis: ["./controllers/account/*.js", "./swagger/*"],
};

const specs = swaggereJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
