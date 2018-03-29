function generateRandomIdAll (userContext, events, done) {
 userContext.vars.id = Math.floor(Math.random() * 1000000) + 1;
 return done();
}

function generateRandomId1000 (userContext, events, done) {
 userContext.vars.id = Math.floor(Math.random() * 1000) + 1;
 return done();
}

module.exports = {
  generateRandomIdAll,
  generateRandomId1000
};