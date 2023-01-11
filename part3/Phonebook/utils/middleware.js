const logger = require("../utils/logger");

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

//This uses morgan
// const logger = (tokens, request, response) => {
//   return [
//     tokens.method(request, response),
//     tokens.url(request, response),
//     tokens.status(request, response),
//     tokens.res(request, response, "content-length"),
//     "-",
//     tokens["response-time"](request, response),
//     "ms",
//     JSON.stringify(request.body),
//     "\n ######## \n",
//   ].join(" ");
// };

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("Status:  ", response.status);
  logger.info("---");
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
