var common = require("../common.js");

var helper = common.helper;
var request = common.request;
var amazonEcho = common.amazonEcho;
var flow = common.flow;

var apiURL = "http://localhost:" + flow[1].port;

describe('Philips Hue REST API ', function() {

  it('description', function(done) {

    helper.load(amazonEcho, flow, function() {
      try {
        request(apiURL)
          .get('/description.xml')
          .set('Accept', 'application/xml')
          .end(function(err, res) {
            // Status
            res.status.should.equal(200);
            // Body
            res.text.should.not.be.empty().and.match(/Philips hue bridge 2012/);

            done();
          });
      } catch (e) {
        done(e);
      }
    });
  });

  it('registration', function(done) {

    helper.load(amazonEcho, flow, function() {
      try {
        request(apiURL)
          .post('/api')
          .set('Accept', 'application/json')
          .end(function(err, res) {
            // Status
            res.status.should.equal(200);
            // Body
            res.body.should.be.deepEqual([{
              success: {
                username: 'c6260f982b43a226b5542b967f612ce'
              }
            }]);

            done();
          });
      } catch (e) {
        done(e);
      }
    });
  });

  it('get state', function(done) {

    helper.load(amazonEcho, flow, function() {
      try {
        request(apiURL)
          .get('/api/c6260f982b43a226b5542b967f612ce')
          .set('Accept', 'application/json')
          .end(function(err, res) {
            // Status
            res.status.should.equal(200);
            // Body
            res.body.lights['00000000000002'].state.should.have.property("on", false);

            done();
          });
      } catch (e) {
        done(e);
      }
    });
  });

  it('get lights', function(done) {

    helper.load(amazonEcho, flow, function() {
      try {
        request(apiURL)
          .get('/api/c6260f982b43a226b5542b967f612ce/lights')
          .set('Accept', 'application/json')
          .end(function(err, res) {
            // Status
            res.status.should.equal(200);
            // Body
            res.body['00000000000002'].state.should.have.property("on", false);

            done();
          });
      } catch (e) {
        done(e);
      }
    });
  });

  it('get light state', function(done) {

    helper.load(amazonEcho, flow, function() {
      try {
        request(apiURL)
          .get('/api/c6260f982b43a226b5542b967f612ce/lights/00000000000002')
          .set('Accept', 'application/json')
          .end(function(err, res) {
            // Status
            res.status.should.equal(200);
            // Body
            res.body.state.should.have.property("on", false);

            done();
          });
      } catch (e) {
        done(e);
      }
    });
  });

  it('switch off', function(done) {

    helper.load(amazonEcho, flow, function() {
      try {
        var hub = helper.getNode("000000000.000001");
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

        request(apiURL)
          .put('/api/c6260f982b43a226b5542b967f612ce/lights/00000000000002/state')
          .set('Accept', 'application/json')
          .send({
            on: false
          })
          .end(function(err, res) {
            // Status
            res.status.should.equal(200);
            // Body
            ({
              success: {
                '/lights/1/state/on': false
              }
            }).should.be.oneOf(res.body);
          });

      } catch (e) {
        done(e);
      }
    });
  });

  it('switch on', function(done) {

    helper.load(amazonEcho, flow, function() {
      try {
        var hub = helper.getNode("000000000.000001");
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

        request(apiURL)
          .put('/api/c6260f982b43a226b5542b967f612ce/lights/00000000000002/state')
          .set('Accept', 'application/json')
          .send({
            on: true
          })
          .end(function(err, res) {
            // Status
            res.status.should.equal(200);
            // Body
            ({
              success: {
                '/lights/1/state/on': true
              }
            }).should.be.oneOf(res.body);
          });

      } catch (e) {
        done(e);
      }
    });
  });

  it('brightness to 10%', function(done) {

    helper.load(amazonEcho, flow, function() {
      try {
        var hub = helper.getNode("000000000.000001");
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

        request(apiURL)
          .put('/api/c6260f982b43a226b5542b967f612ce/lights/00000000000002/state')
          .set('Accept', 'application/json')
          .send({
            bri: 26
          })
          .end(function(err, res) {
            // Status
            res.status.should.equal(200);
            // Body
            ({
              success: {
                '/lights/1/state/bri': 26
              }
            }).should.be.oneOf(res.body);
          });


      } catch (e) {
        done(e);
      }
    });
  });

  it('color to warm white', function(done) {

    helper.load(amazonEcho, flow, function() {
      try {
        var hub = helper.getNode("000000000.000001");
        var bulb = helper.getNode("00000000.000002");
        var hn = helper.getNode("00000000.0000f0");

        hn.on("input", function(msg) {
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

        request(apiURL)
          .put('/api/c6260f982b43a226b5542b967f612ce/lights/00000000000002/state')
          .set('Accept', 'application/json')
          .send({
            ct: 383
          })
          .end(function(err, res) {
            // Status
            res.status.should.equal(200);
            // Body
            ({
              success: {
                '/lights/1/state/ct': 383
              }
            }).should.be.oneOf(res.body);
          });

      } catch (e) {
        done(e);
      }
    });
  });

  it('HS color to cyan', function(done) {

    helper.load(amazonEcho, flow, function() {
      try {
        var hub = helper.getNode("000000000.000001");
        var bulb = helper.getNode("00000000.000002");
        var hn = helper.getNode("00000000.0000f0");

        hn.on("input", function(msg) {
          try {
            msg.should.have.property("on", false);
            msg.should.have.property("colormode", "hs");
            msg.should.have.property("hue", 32768);
            msg.should.have.property("sat", 254);
            msg.should.have.property("xy").and.eql([0.31363952617905655, 0.3295237237240357]);
            msg.should.have.property("rgb").and.eql([0, 254, 254]);
            msg.should.have.property("ct", 199);

            delete msg.meta["insert"];

            msg.should.have.property("meta").which.is.deepEqual({
              "input": {
                "hue": 32768,
                "sat": 254
              },
              "changes": {
                "hue": 0,
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

        request(apiURL)
          .put('/api/c6260f982b43a226b5542b967f612ce/lights/00000000000002/state')
          .set('Accept', 'application/json')
          .send({
            hue: 32768,
            sat: 254
          })
          .end(function(err, res) {

            // Status
            res.status.should.equal(200);
            // Body
            ({
              success: {
                '/lights/1/state/hue': 32768
              }
            }).should.be.oneOf(res.body);
            ({
              success: {
                '/lights/1/state/sat': 254
              }
            }).should.be.oneOf(res.body);
          });

      } catch (e) {
        done(e);
      }
    });
  });

  it('meta details', function(done) {

    helper.load(amazonEcho, flow, function() {
      try {
        var hub = helper.getNode("000000000.000001");
        var bulb = helper.getNode("00000000.000002");
        var hn = helper.getNode("00000000.0000f0");

        hn.on("input", function(msg) {
          try {
            msg.should.have.property("payload", "off");
            msg.should.have.property("on", false);

            msg.meta.insert.details.date.should.be.instanceOf(Date);

            delete msg.meta.insert.details["date"];

            msg.meta.insert.should.have.property("by", "alexa");
            msg.meta.insert.should.have.property("details").which.is.deepEqual({
              "ip": "::ffff:127.0.0.1",
              "user_agent": "Dalvik/2.1.0 (Linux; U; Android 7.1.2; AEODN Build/NS6533)"
            });

            done();

          } catch (e) {
            done(e);
          }
        });

        request(apiURL)
          .put('/api/c6260f982b43a226b5542b967f612ce/lights/00000000000002/state')
          .set('User-Agent', 'Dalvik/2.1.0 (Linux; U; Android 7.1.2; AEODN Build/NS6533)')
          .set('Accept', 'application/json')
          .send({
            on: false
          })
          .end(function(err, res) {
            // Status
            res.status.should.equal(200);
            // Body
            ({
              success: {
                '/lights/1/state/on': false
              }
            }).should.be.oneOf(res.body);
          });

      } catch (e) {
        done(e);
      }
    });
  });

});
