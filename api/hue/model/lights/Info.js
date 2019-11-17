/**
 * Response for device information.
 */
module.exports = class Info {
  /**
   * Constructor.
   *
   * @param {string} name  Device name.
   * @param {State}  state State information.
   * @param {string} type  Device type.
   * @param {string} modelid Device model ID.
   * @param {string} type  Device type.
   * @param {string} swversion  Device software version.
   */
  constructor(name, state, type, modelid, swversion) {
    this.state = state;
    this.type = type;
    this.name = name;
    this.modelid = modelid;
    this.swversion = swversion;
    this.swupdate = {
      state: 'noupdates',
      lastinstall: new Date().toISOString().split('.').shift()
    };
  }

  /**
   * Add device capabilities to info.
   *
   * @param {Capabilities} capabilities
   * @returns {Info}
   */
  withCapabilities(capabilities) {
    this.capabilities = capabilities;
    return this;
  }

  /**
   * Add extended information.
   *
   * @returns {Info}
   */
  extended() {
    this.manufacturername = 'Philips';
    this.productname = 'Hue color lamp';
    this.config = {
      archetype: 'sultanbulb',
      function: 'mixed',
      direction: 'omnidirectional'
    };
    this.uniqueid = '00:11:22:33:44:55:66:77-88';
    return this;
  }

  /**
   * Create Info object for RGBW light.
   *
   * @param {string} name  Device name.
   * @param {State}  state State information
   * @returns {Info} Info object.
   * @constructor
   */
  static forRGBW(name, state) {
    return new Info(name, state, 'Extended color light', 'LCT007', '5.105.0.21169');
  }

  /**
   * Create Info object for CT light.
   *
   * @param {string} name  Device name.
   * @param {State}  state State information
   * @returns {Info} Info object.
   * @constructor
   */
  static forCT(name, state) {
    return new Info(name, state, 'Color Temperature Light', 'LTW012', '1.29.0_r21169');
  }

  /**
   * Create Info object for a dimmable, fixed color light.
   *
   * @param {string} name  Device name.
   * @param {State}  state State information
   * @returns {Info} Info object.
   * @constructor
   */
  static forDimmable(name, state) {
    return new Info(name, state, 'Dimmable Light', 'LWB007', '66012040');
  }
};
