var common = require("./common.js");

var helper = common.helper;
var request = common.request;
var amazonEcho = common.amazonEcho;

helper.init(require.resolve('node-red'));

describe('Amazon Echo Hub Node', function() {

  before(function(done) {
    helper.startServer(done);
  });

  after(function(done) {
    helper.stopServer(done);
  });

  afterEach(function() {
    helper.unload();
  });

  require('./api/hue.js');
  require('./input/hub.js');


});
