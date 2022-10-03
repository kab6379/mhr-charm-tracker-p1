const charms = {};
let numCharms = 0;

// JSON Responses for Body requests
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// JSON Responses for Head Requests
const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// Get charms Body
const getCharms = (request, response) => {
  const responseJSON = {
    charms,
  };

  respondJSON(request, response, 200, responseJSON);
};

// Get charms Head
const getCharmsMeta = (request, response) => {
  respondJSONMeta(request, response, 200);
};

// Add charm to data
const addCharm = (request, response, body) => {
  const responseJSON = {
    message: 'All parameters are required.',
  };

  if (!body.skillOne || !body.sOnePoints || !body.skillTwo || !body.sTwoPoints || !body.slot) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 204;

  if (!charms[numCharms]) {
    responseCode = 201;
    charms[numCharms] = {};
  }

  charms[numCharms].skillOne = body.skillOne;
  charms[numCharms].sOnePoints = body.sOnePoints;
  charms[numCharms].skillTwo = body.skillTwo;
  charms[numCharms].sTwoPoints = body.sTwoPoints;
  charms[numCharms].slot = body.slot;

  if (responseCode === 201) {
    numCharms++;
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};

// Update existing charm
const updateCharm = (request, response) => {
  const newCharm = {
    createdAt: Date.now(),
  };

  charms[newCharm.createdAt] = newCharm;

  return respondJSON(request, response, 201, newCharm);
};

// Not real Body
const notReal = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

// Not real Head
const notRealMeta = (request, response) => {
  respondJSONMeta(request, response, 404);
};

// Exports
module.exports = {
  getCharms,
  getCharmsMeta,
  addCharm,
  updateCharm,
  notReal,
  notRealMeta,
};
