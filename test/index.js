const common = require("./common.js");

const nodeTestHelper = common.nodeTestHelper;

nodeTestHelper.init(require.resolve('node-red'));

describe('Amazon Echo Hub Node', function() {

  before(function(done) {
    nodeTestHelper.startServer(done);
  });

  after(function(done) {
    nodeTestHelper.stopServer(done);
  });

  afterEach(function() {
    nodeTestHelper.unload();
  });

  require('./nodes/hub/10-input-spec.js');
  require('./nodes/hub/11-philips-hue-spec.js');

});
