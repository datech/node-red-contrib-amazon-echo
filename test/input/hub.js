var common = require("../common.js");

var helper = common.helper;
var request = common.request;
var amazonEcho = common.amazonEcho;
var flow = common.flow;

var apiURL = "http://localhost:" + flow[1].port;

describe('Amazon Echo Hub', function() {

  it('switch off', function(done) {

    helper.load(amazonEcho, flow, function() {
      try {
        var hub = helper.getNode("00000000.000001");
        var bulb = helper.getNode("00000000.000002");
        var hn = helper.getNode("00000000.0000f0");

        hn.on("input", function(msg) {
          try {
            msg.should.have.property("payload", "off");
            msg.should.have.property("on", false);

            delete msg.meta["insert"];

            msg.should.have.property("meta").which.is.deepEqual({
              "input": {
                "on": false
              },
              "changes": {}
            });

            done();

          } catch (e) {
            done(e);
          }
        });

        hub.receive({
          payload: {
            nodeid: "00000000.000002",
            on: false
          }
        });

      } catch (e) {
        done(e);
      }
    });
  });

  it('switch on', function(done) {

    helper.load(amazonEcho, flow, function() {
      try {
        var hub = helper.getNode("00000000.000001");
        var bulb = helper.getNode("00000000.000002");
        var hn = helper.getNode("00000000.0000f0");

        hn.on("input", function(msg) {
          try {
            msg.should.have.property("payload", "on");
            msg.should.have.property("on", true);

            delete msg.meta["insert"];

            msg.should.have.property("meta").which.is.deepEqual({
              "input": {
                "on": true
              },
              "changes": {
                "on": false
              }
            });

            done();

          } catch (e) {
            done(e);
          }
        });

        hub.receive({
          payload: {
            nodeid: "00000000.000002",
            on: true
          }
        });

      } catch (e) {
        done(e);
      }
    });
  });

  it('brightness to 10%', function(done) {

    helper.load(amazonEcho, flow, function() {
      try {
        var hub = helper.getNode("00000000.000001");
        var bulb = helper.getNode("00000000.000002");
        var hn = helper.getNode("00000000.0000f0");

        hn.on("input", function(msg) {
          try {
            msg.should.have.property("on", false);
            msg.should.have.property("bri", 26);
            msg.should.have.property("percentage", 10);

            delete msg.meta["insert"];

            msg.should.have.property("meta").which.is.deepEqual({
              "input": {
                "bri": 26
              },
              "changes": {
                "bri": 254,
                "percentage": 100
              }
            });

            done();

          } catch (e) {
            done(e);
          }
        });

        hub.receive({
          payload: {
            nodeid: "00000000.000002",
            bri: 26
          }
        });

      } catch (e) {
        done(e);
      }
    });
  });

  it('color to warm white', function(done) {

    helper.load(amazonEcho, flow, function() {
      try {
        var hub = helper.getNode("00000000.000001");
        var bulb = helper.getNode("00000000.000002");

        bulb.on("input", function(msg) {
          try {
            msg.should.have.property("on", false);
            msg.should.have.property("colormode", "ct");
            msg.should.have.property("ct", 383);
            msg.should.have.property("hue", 0);
            msg.should.have.property("sat", 254);
            msg.should.have.property("xy").and.eql([0.6484272236872118, 0.33085610147277794]);
            msg.should.have.property("rgb").and.eql([254, 0, 0]);

            delete msg.meta["insert"];

            msg.should.have.property("meta").which.is.deepEqual({
              "input": {
                "ct": 383
              },
              "changes": {
                "ct": 199
              }
            });

            done();

          } catch (e) {
            done(e);
          }
        });

        hub.receive({
          payload: {
            nodeid: "00000000.000002",
            ct: 383
          }
        });

      } catch (e) {
        done(e);
      }
    });
  });

  it('HS color to cyan', function(done) {

    helper.load(amazonEcho, flow, function() {
      try {
        var hub = helper.getNode("00000000.000001");
        var bulb = helper.getNode("00000000.000002");
        var hn = helper.getNode("00000000.0000f0");

        hn.on("input", function(msg) {
          try {
            msg.should.have.property("on", false);
            msg.should.have.property("colormode", "hs");
            msg.should.have.property("hue", 7282);
            msg.should.have.property("sat", 96);
            msg.should.have.property("xy").and.eql([0.41095573566484234, 0.4163837804141732]);
            msg.should.have.property("rgb").and.eql([254, 222, 158]);
            msg.should.have.property("ct", 199);

            delete msg.meta["insert"];

            msg.should.have.property("meta").which.is.deepEqual({
              "input": {
                "hue": 7282,
                "sat": 96
              },
              "changes": {
                "hue": 0,
                "sat": 254,
                "xy": [0.6484272236872118, 0.33085610147277794],
                "rgb": [254, 0, 0],
                "colormode": "ct"
              }
            });

            done();

          } catch (e) {
            done(e);
          }
        });

        hub.receive({
          payload: {
            nodeid: "00000000.000002",
            hue: 7282,
            sat: 96
          }
        });

      } catch (e) {
        done(e);
      }
    });
  });

  it('XY color to cyan', function(done) {

    helper.load(amazonEcho, flow, function() {
      try {
        var hub = helper.getNode("00000000.000001");
        var bulb = helper.getNode("00000000.000002");
        var hn = helper.getNode("00000000.0000f0");

        hn.on("input", function(msg) {
          try {
            msg.should.have.property("on", false);
            msg.should.have.property("colormode", "hs");
            msg.should.have.property("hue", 7282);
            msg.should.have.property("sat", 96);
            msg.should.have.property("xy").and.eql([0.4, 0.4]);
            msg.should.have.property("rgb").and.eql([255, 223, 159]);
            msg.should.have.property("ct", 199);

            delete msg.meta["insert"];

            msg.should.have.property("meta").which.is.deepEqual({
              "input": {
                "xy": [0.4, 0.4]
              },
              "changes": {
                "hue": 0,
                "sat": 254,
                "xy": [0.6484272236872118, 0.33085610147277794],
                "rgb": [254, 0, 0],
                "colormode": "ct"
              }
            });

            done();

          } catch (e) {
            done(e);
          }
        });

        hub.receive({
          payload: {
            nodeid: "00000000.000002",
            xy: [0.4, 0.4]
          }
        });

      } catch (e) {
        done(e);
      }
    });
  });

  it('RGB color to cyan', function(done) {

    helper.load(amazonEcho, flow, function() {
      try {
        var hub = helper.getNode("00000000.000001");
        var bulb = helper.getNode("00000000.000002");
        var hn = helper.getNode("00000000.0000f0");

        hn.on("input", function(msg) {
          try {
            msg.should.have.property("on", false);
            msg.should.have.property("colormode", "hs");
            msg.should.have.property("hue", 7282);
            msg.should.have.property("sat", 96);
            msg.should.have.property("xy").and.eql([0.4106395702541955, 0.41618602485898437]);
            msg.should.have.property("rgb").and.eql([255, 223, 159]);
            msg.should.have.property("ct", 199);

            delete msg.meta["insert"];

            msg.should.have.property("meta").which.is.deepEqual({
              "input": {
                "rgb": [255, 223, 159]
              },
              "changes": {
                "hue": 0,
                "sat": 254,
                "xy": [0.6484272236872118, 0.33085610147277794],
                "rgb": [254, 0, 0],
                "colormode": "ct"
              }
            });

            done();

          } catch (e) {
            done(e);
          }
        });

        hub.receive({
          payload: {
            nodeid: "00000000.000002",
            rgb: [255, 223, 159]
          }
        });

      } catch (e) {
        done(e);
      }
    });
  });

  it('meta details', function(done) {

    helper.load(amazonEcho, flow, function() {
      try {
        var hub = helper.getNode("00000000.000001");
        var bulb = helper.getNode("00000000.000002");
        var hn = helper.getNode("00000000.0000f0");

        hn.on("input", function(msg) {
          try {
            msg.should.have.property("payload", "off");
            msg.should.have.property("on", false);

            msg.meta.insert.details.date.should.be.instanceOf(Date);

            delete msg.meta.insert.details["date"];

            msg.meta.insert.should.have.property("by", "input");
            msg.meta.insert.details.should.not.have.property("ip");
            msg.meta.insert.details.should.not.have.property("user_agent");

            done();

          } catch (e) {
            done(e);
          }
        });

        hub.receive({
          payload: {
            nodeid: "00000000.000002",
            on: false
          }
        });

      } catch (e) {
        done(e);
      }
    });
  });

  it('should not process input', function(done) {

    flow[1].processinput = 0;

    helper.load(amazonEcho, flow, function() {
      try {
        var hub = helper.getNode("00000000.000001");
        var bulb = helper.getNode("00000000.000002");
        var hn = helper.getNode("00000000.0000f0");

        setTimeout(function() {
          done();
        }, 50);

        hn.on("input", function(msg) {
          done("Unexpected message for the configured process input state");
        });

        hub.receive({
          payload: {
            nodeid: "00000000.000002",
            on: true
          }
        });

      } catch (e) {
        done(e);
      }
    });
  });

  it('should process input', function(done) {

    flow[1].processinput = 1;

    helper.load(amazonEcho, flow, function() {
      try {
        var hub = helper.getNode("00000000.000001");
        var bulb = helper.getNode("00000000.000002");
        var hn = helper.getNode("00000000.0000f0");

        hn.on("input", function(msg) {
          done("Unexpected message for the configured process input state");
        });

        hub.receive({
          payload: {
            nodeid: "00000000.000002",
            on: true
          }
        });

        request(apiURL)
          .get('/api/c6260f982b43a226b5542b967f612ce/lights/00000000000002')
          .set('Accept', 'application/json')
          .end(function(err, res) {
            // Status
            res.status.should.equal(200);
            // Body
            res.body.state.should.have.property("on", true);

            done();
          });

      } catch (e) {
        done(e);
      }
    });
  });

  it('should process and output on state change', function(done) {

    flow[1].processinput = 3;

    helper.load(amazonEcho, flow, function() {
      try {
        var msgCount = 0;
        var hub = helper.getNode("00000000.000001");
        var bulb = helper.getNode("00000000.000002");
        var hn = helper.getNode("00000000.0000f0");

        hn.on("input", function(msg) {
          try {
            msgCount++;

            if (msgCount == 1) {
              msg.should.have.property("on", true);
              msg.should.have.property("bri", 254);
            }
            if (msgCount == 2) {
              msg.should.have.property("on", true);
              msg.should.have.property("bri", 100);
              done();
            }
          } catch (e) {
            done(e);
          }
        });

        hub.receive({
          payload: {
            nodeid: "00000000.000002",
            on: false
          }
        });

        hub.receive({
          payload: {
            nodeid: "00000000.000002",
            on: true
          }
        });

        hub.receive({
          payload: {
            nodeid: "00000000.000002",
            on: true
          }
        });

        hub.receive({
          payload: {
            nodeid: "00000000.000002",
            bri: 100
          }
        });

      } catch (e) {
        done(e);
      }
    });
  });

});
