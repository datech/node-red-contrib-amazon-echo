/**
 * State representation for a light.
 */
module.exports = class State {
  /**
   * Constructor.
   *
   * @param {boolean} on   On/Off state.
   * @param {number}  bri  Brightness.
   * @param {number}  hue  Color hue.
   * @param {number}  sat  Saturation.
   * @param {number}  ct   Color temperature.
   * @param {string}  mode Color mode.
   * @constructor
   */
  constructor(on, bri, hue, sat, ct, mode) {
    this.on = on;
    this.bri = bri;
    this.hue = hue;
    this.sat = sat;
    this.effect = 'none';
    this.xy = [0.0, 0.0];
    this.ct = ct;
    this.alert = 'none';
    this.colormode = mode;
    this.mode = 'homeautomation';
    this.reachable = true;
  }

  /**
   * Create State object for dimmable, fixed color light.
   *
   * @param {boolean} on  On/Off state.
   * @param {number}  bri Brightness.
   * @returns {State}
   */
  static forDimmable(on, bri) {
    return new State(on, bri, null, null, null, 'ct');
  }

  /**
   * Create State object for color temperature light.
   *
   * @param {boolean} on  On/Off state.
   * @param {number}  bri Brightness.
   * @param {number}  ct  Color temperature.
   * @returns {State}
   */
  static forCT(on, bri, ct) {
    return new State(on, bri, null, null, ct, 'ct');
  }

  /**
   * Create State object for RGB light.
   *
   * @param {boolean} on   On/Off state.
   * @param {number}  bri  Brightness.
   * @param {number}  hue  Color hue.
   * @param {number}  sat  Saturation.
   * @returns {State}
   */
  static forRGB(on, bri, hue, sat) {
    return new State(on, bri, hue, sat, null, 'hs');
  }

  /**
   * Create State object for RGBW light.
   *
   * @param {boolean} on   On/Off state.
   * @param {number}  bri  Brightness.
   * @param {number}  hue  Color hue.
   * @param {number}  sat  Saturation.
   * @param {number}  ct   Color temperature.
   * @param {string}  mode Color mode.
   * @returns {State}
   */
  static forRGBW(on, bri, hue, sat, ct, mode) {
    return new State(on, bri, hue, sat, ct, mode);
  }
};
