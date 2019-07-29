module.exports = function(RED) {
    'use strict';

    function AmazonEchoDeviceNode(config) {
        RED.nodes.createNode(this, config);
        var deviceNode = this;

        deviceNode.on('input', function(msg) {

          var nodeDeviceId = formatUUID(config.id);

          if ( nodeDeviceId == msg.deviceid ){
            msg.topic = config.topic;
            deviceNode.send(msg);
          }

        });
    }

    // NodeRED registration
    RED.nodes.registerType("amazon-echo-device", AmazonEchoDeviceNode, {
    });

    function AmazonEchoHubNode(config) {

        RED.nodes.createNode(this, config);
        var hubNode = this;

        var port = config.port > 0 && config.port < 65536 ? config.port : 80;

        // Start SSDP service
        ssdp(port, config);

        // Stoppable kill the server on deploy
        const graceMilliseconds = 500;
        var stoppable = require('stoppable');
        var http = require('http');
        var app = require('express')();
        var httpServer = stoppable(http.createServer(app), graceMilliseconds);

        httpServer.on('error', function(error) {
          hubNode.status({fill:"red", shape:"ring", text:"Unable to start on port " + port});
          RED.log.error(error);
          return;
        });

        httpServer.listen(port, function(error) {

            if (error) {
                hubNode.status({fill:"red", shape:"ring", text:"Unable to start on port " + port});
                RED.log.error(error);
                return;
            }

            hubNode.status({fill:"green", shape:"dot", text:"online"});

            // REST API Settings
            api(app, hubNode, config);
        });

        hubNode.on('input', function(msg) {

          if (config.enableinput &&
            typeof msg.payload === "object" && "nodeid" in msg.payload && msg.payload.nodeid !== null){

            msg.payload.deviceid = formatUUID(msg.payload.nodeid);
            delete msg.payload["nodeid"];

            // Send payload if state is changed
            var stateChanged = false;
            var deviceAttributes = getDeviceAttributes(msg.payload.deviceid, hubNode.context());

            for (var key in msg.payload) {
              if (key in deviceAttributes && msg.payload[key] !== deviceAttributes[key]){
                stateChanged = true;
              }
            }

            if (stateChanged){
              setDeviceAttributes(msg.payload.deviceid, msg.payload, hubNode.context());
              payloadHandler(hubNode, msg.payload.deviceid);
            }
          }
        });

        hubNode.on('close', function(removed, doneFunction) {
          httpServer.stop(function(){
            if (typeof doneFunction === 'function')
                doneFunction();
            RED.log.info("Alexa Local Hub closing done...");
          });
          setImmediate(function(){
              httpServer.emit('close');
          });
        });
    }

    // NodeRED registration
    RED.nodes.registerType("amazon-echo-hub", AmazonEchoHubNode, {
    });

    //
    // REST API
    //
    function api(app, hubNode, config) {

      const Mustache = require("mustache");

      var fs = require('fs');
      var bodyParser = require('body-parser');

      app.use(bodyParser.json({type: '*/*'}));

      app.use(function(err, req, res, next) {
        if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
          RED.log.debug("Error: Invalid JSON request: " + JSON.stringify(err.body));
        }
        next();
      });

      app.use(function (req, res, next) {
        if (Object.keys(req.body).length > 0)
          RED.log.debug("Request body: " + JSON.stringify(req.body));
        next();
      });

      app.get('/description.xml', function (req, res) {
        var template = fs.readFileSync(__dirname + '/api/hue/templates/description.xml').toString();

        var data = {
          address: req.hostname,
          port: req.connection.localPort,
          huehubid: getHueHubId(config)
        };

        var output = Mustache.render(template, data);

        res.type('application/xml');
        res.send(output);
      });

      app.post('/api', function (req, res) {
        var template = fs.readFileSync(__dirname + '/api/hue/templates/registration.json', 'utf8').toString();

        var data = {
          username: "c6260f982b43a226b5542b967f612ce"
        };

        var output = Mustache.render(template, data);
        output = JSON.parse(output);

        res.json(output);
      });

      app.get('/api/:username', function (req, res) {
        var lightsTemplate = fs.readFileSync(__dirname + '/api/hue/templates/lights/all.json', 'utf8').toString();
        var template = fs.readFileSync(__dirname + '/api/hue/templates/state.json', 'utf8').toString();

        var data = {
          lights: getDevicesAttributes(hubNode.context()),
          address: req.hostname,
          username: req.params.username,
          date: new Date().toISOString().split('.').shift()
        }

        var output = Mustache.render(template, data, {lightsTemplate: lightsTemplate});
        output = JSON.parse(output);
        delete output.lights.last;

        res.json(output);
      });

      app.get('/api/:username/lights', function (req, res) {
        var template = fs.readFileSync(__dirname + '/api/hue/templates/lights/all.json', 'utf8').toString();

        var data = {
          lights: getDevicesAttributes(hubNode.context()),
          date: new Date().toISOString().split('.').shift()
        }

        var output = Mustache.render(template, data);
        output = JSON.parse(output);
        delete output.last;

        res.json(output);
      });

      app.get('/api/:username/lights/:id', function (req, res) {
        var template = fs.readFileSync(__dirname + '/api/hue/templates/lights/get-state.json', 'utf8').toString();

        var deviceName = "";

        getDevices().forEach(function(device) {
          if ( req.params.id == device.id )
            deviceName = device.name
        });

        var data = getDeviceAttributes(req.params.id, hubNode.context());
        data.name = deviceName;
        data.date = new Date().toISOString().split('.').shift();

        var output = Mustache.render(template, data);
        output = JSON.parse(output);

        res.json(output);
      });

      app.put('/api/:username/lights/:id/state', function (req, res) {

        setDeviceAttributes(req.params.id, req.body, hubNode.context());

        var template = fs.readFileSync(__dirname + '/api/hue/templates/lights/set-state.json', 'utf8').toString();

        var data = getDeviceAttributes(req.params.id, hubNode.context());

        var output = Mustache.render(template, data);
        output = JSON.parse(output);

        res.json(output);

        payloadHandler(hubNode, req.params.id);
      });

    }

    //
    // SSDP
    //
    function ssdp(port, config) {

        var ssdpService = require('node-ssdp').Server
          , server = new ssdpService({
              location: {
                port: port,
                path: '/description.xml'
              },
              udn: 'uuid:' + getHueHubId(config)
            })

        server.addUSN('upnp:rootdevice');
        server.addUSN('urn:schemas-upnp-org:device:basic:1');

        server.start();
    }

    //
    // Helpers
    //
    function getOrDefault(key, defaultValue, context) {

      var value = null;
      var storageValue = context.get(key);

      // Clone value
      if (storageValue !== undefined) {
        value = Object.assign({}, storageValue);
      }

      return valueOrDefault(value, defaultValue);
    }

    function valueOrDefault(value, defaultValue) {

      if (value === undefined || value === null) {
        value = defaultValue;
      }

      return value;
    }

    function formatUUID(id) {

        if (id === null || id === undefined)
            return "";
        return ("" + id).replace(".", "").trim();
    }

    function getHueHubId(config) {

        var uuid = "00112233-4455-6677-8899-";
        uuid += formatUUID(config.id);
        return uuid;
    }

    function getDevices() {

      var devices = [];

      RED.nodes.eachNode(function(node){
        if ( node.type == "amazon-echo-device" ){
          devices.push({id: formatUUID(node.id), name: node.name});
        }
      });

      return devices;
    }

    function getDeviceAttributes(id, context) {

      var defaultAttributes = {
        on: false,
        bri: 254,
        hue: 0,
        sat: 254,
        ct: 199,
        colormode: "ct"
      };

      return getOrDefault(id, defaultAttributes, context);
    }

    function getDevicesAttributes(context) {

      var devices = getDevices();
      var devicesAttributes = [];

      for (var key in devices) {
        var attributes = getDeviceAttributes(devices[key].id, context);
        devicesAttributes.push(Object.assign({}, attributes, devices[key]));
      }

      return devicesAttributes;
    }

    function setDeviceAttributes(id, attributes, context) {

      if (attributes.xy !== undefined && attributes.xy !== null) {
        var xy = attributes.xy;
        var hsb = colorXYY2SHB(xy[0], xy[1], 100);
        attributes.hue = hsb[0];
        attributes.sat = hsb[1];
      }

      var currentAttributes = getDeviceAttributes(id, context);

      for (var key in currentAttributes) {
        currentAttributes[key] =
            valueOrDefault(attributes[key], currentAttributes[key]);
      }

      // Set correct color mode
      if ( attributes.ct !== undefined ){
        currentAttributes.colormode = "ct";
      }else if ( attributes.hue !== undefined || attributes.sat !== undefined ) {
        currentAttributes.colormode = "hs";
      }

      // Save attributes
      context.set(id, currentAttributes);

      return getOrDefault(id, currentAttributes, context);
    }

    //
    // Handlers
    //
    function payloadHandler(hubNode, deviceId) {

      var msg = getDeviceAttributes(deviceId, hubNode.context());
      msg.rgb = colorSHB2RGB(msg.hue, msg.sat, 254);
      var percentArray = [1,4,6,9,11,14,16,19,21,24,26,29,31,34,36,39,41,44,47,49,52,54,47,59,62,64,67,69,72,74,77,79,82,84,87,90,92,95,97,100,102,105,107,110,112,115,117,120,122,125,128,130,133,135,138,140,143,145,148,150,153,155,158,160,163,165,168,171,173,176,178,181,183,186,188,191,193,196,198,201,203,206,208,211,214,216,219,221,224,226,229,231,234,236,239,241,244,246,249,251,254];
      msg.percentage = percentArray.indexOf(msg.bri);
      msg.payload = msg.on ? "on" : "off";
      msg.deviceid = deviceId;
      msg.topic = "";

      hubNode.send(msg);
    }

    //
    // Colors conversion
    //
    var colorConvert = require('color-convert');

    function colorXYY2XYZ(xs, ys, yc){
      var xc = xs * yc / ys;
      var zc = (1 - xs - ys) * yc / ys;

      return [xc, yc, zc];
    }

    function colorXYZ2SHV(x, y, z){
      var hsv = colorConvert.xyz.hsv(x, y, z);

      return hsv;
    }

    function colorSHV2HSB(h, s, v){
      var hh = h / 360 * 65535;
      var ss = s / 100 * 254;
      var bb = v / 100 * 254;

      return [hh, ss, bb]
    }

    function colorSHB2HSV(h, s, b){
      var hh = h * 360 / 65535;
      var ss = s * 100 / 254;
      var vv = b * 100 / 254;

      return [hh, ss, vv]
    }

    function colorXYY2SHB(xs, ys, yc){
      var xyz = colorXYY2XYZ(xs, ys, yc);
      var hsv = colorXYZ2SHV(xyz[0], xyz[1], xyz[2]);
      var hsb = colorSHV2HSB(hsv[0], hsv[1], hsv[2]);

      return hsb;
    }

    function colorSHB2RGB(h, s, b){
      var hsv = colorSHB2HSV(h, s, b);
      var rgb = colorConvert.hsv.rgb(hsv[0], hsv[1], hsv[2]);

      return rgb;
    }
}
