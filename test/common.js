const helper = require("node-red-node-test-helper");
const request = require('supertest');
const amazonEcho = require("../index.js");

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

exports.helper = helper;
exports.request = request;
exports.amazonEcho = amazonEcho;
exports.flow = flow;
