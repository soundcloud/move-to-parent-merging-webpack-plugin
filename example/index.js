// Introduce split points for two child chunks.
// Each child chunk contains a 'common' module.
// That common child module will be lifted to the parent chunk (this chunk).

require.ensure([], function (require) {
  require("./child-a");
});

require.ensure([], function (require) {
  require("./child-b");
});
