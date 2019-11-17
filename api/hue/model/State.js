/**
 * Global state model.
 */
module.exports = class State {
  /**
   * Constructor.
   *
   * @param {string} addr     Bridge address.
   * @param {string} username Current username.
   * @constructor
   */
  constructor(addr, username) {
    const date = new Date().toISOString().split('.').shift();

    this.lights = {};
    this.groups = {};
    this.schedules = {};
    this.config = {
      name: 'Philips hue',
      mac: '00:00:00:aa:bb:cc',
      dhcp: true,
      ipaddress: addr,
      netmask: '0.0.0.0',
      gateway: '0.0.0.0',
      proxyaddress: '',
      proxyport: 0,
      UTC: date,
      whitelist: {
        [username]: {
          'last use date': date,
          'create date': date,
          name: 'Echo'
        }
      },
      swversion: '01003372',
      swupdate: {
        updatestate: 0,
        url: '',
        text: '',
        notify: false
      },
      linkbutton: false,
      portalservices: false
    };
    this.swupdate2 = {
      checkforupdate: false,
      lastchange: date,
      bridge: {
        state: 'noupdates',
        lastinstall: date
      },
      state: 'noupdates',
      autoinstall: {
        updatetime: 'T14:00:00',
        on: false
      }
    };
  }

  /**
   * Add light information.
   *
   * @param {Array} lights
   * @returns {State}
   */
  withLights(lights) {
    this.lights = lights;
    return this;
  }
};
