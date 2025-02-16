module.exports = function(RED) {
  'use strict';

  const helpers = require('./lib/helpers.js')();

  function AmazonEchoDeviceNode(config) {
    RED.nodes.createNode(this, config);
    var deviceNode = this;

    deviceNode.on('input', function(msg) {

      var nodeDeviceId = helpers.formatUUID(config.id);

      if (nodeDeviceId == msg.deviceid) {
        msg.topic = config.topic || msg.topic;
        msg.devicename = deviceNode.name;
        deviceNode.send(msg);
      }

    });
  }

  // NodeRED registration
  RED.nodes.registerType('amazon-echo-device', AmazonEchoDeviceNode, {});

}
