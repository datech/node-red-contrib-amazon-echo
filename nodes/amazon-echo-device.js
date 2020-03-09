module.exports = function(RED) {
  'use strict';

  require('./lib/helpers.js')();

  function AmazonEchoDeviceNode(config) {
    RED.nodes.createNode(this, config);
    var deviceNode = this;

    deviceNode.on('input', function(msg) {

      var nodeDeviceId = formatUUID(config.id);

      if (nodeDeviceId == msg.deviceid) {
        msg.topic = config.topic;
        deviceNode.send(msg);
      }

    });
  }

  // NodeRED registration
  RED.nodes.registerType('amazon-echo-device', AmazonEchoDeviceNode, {});

}
