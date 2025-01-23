const request = require('supertest');
const helpers = require("../nodes/lib/helpers.js");
const nodeTestHelper = require("node-red-node-test-helper");
const amazonEchoHub = require("../nodes/amazon-echo-hub.js");
const amazonEchoDevice = require("../nodes/amazon-echo-device.js");

var flow = [{
    "id": "00000000.000000",
    "type": "tab",
    "label": "Flow 1",
    "disabled": false,
    "info": ""
  },
  {
    "id": "00000000.000001",
    "type": "amazon-echo-hub",
    "z": "00000000.000000",
    "port": "8080",
    "processinput": 2,
    "discovery": true,
    "wires": [
      ["00000000.000002"]
    ]
  },
  {
    "id": "00000000.000002",
    "type": "amazon-echo-device",
    "z": "00000000.000000",
    "name": "Bulb",
    "topic": "",
    "wires": [
      ["00000000.0000f0"]
    ]
  },
  {
    "id": "00000000.0000f0",
    "type": "helper",
    "z": "00000000.000000"
  }
];

exports.request = request;
exports.helpers = helpers;
exports.nodeTestHelper = nodeTestHelper;
exports.amazonEchoHub = amazonEchoHub;
exports.amazonEchoDevice = amazonEchoDevice;
exports.flow = flow;
