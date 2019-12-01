/**
 * Device capabilities model.
 */
module.exports = class Capabilities {
  /**
   * Constructor.
   *
   * @param {boolean} dim   Supports dimming?
   * @param {boolean} ct    Supports color temperature?
   * @param {boolean} color Supports color?
   * @constructor
   */
  constructor(dim, ct, color) {
    this.certified = true;
    this.control = {};
    this.streaming = {
      renderer: true,
      proxy: false
    };

    if (dim) {
      this.control.mindimlevel = 5000;
      this.control.maxlumen = 600;
    }

    if (ct) {
      this.control.ct = {
        min: 153,
        max: 500
      };
    }

    if (color) {
      this.control.colorgamuttype = 'B';
      this.control.colorgamut = [
        [0.675, 0.322],
        [0.409, 0.518],
        [0.167, 0.04]
      ];
    }
  }

  /**
   * Get default capabilities for a dimmable, fixed-color light.
   *
   * @returns {Capabilities}
   */
  static forDimmable() {
    return new Capabilities(true, false, false);
  }

  /**
   * Get default capabilities for a Color Temperature light.
   *
   * @returns {Capabilities}
   */
  static forCT() {
    return new Capabilities(true, true, false);
  }

  /**
   * Get default capabilities for an RGB light.
   *
   * @returns {Capabilities}
   */
  static forRGB() {
    return new Capabilities(true, false, true);
  }

  /**
   * Get default capabilities for an RGBW light.
   *
   * @returns {Capabilities}
   */
  static forRGBW() {
    return new Capabilities(true, true, true);
  }
};
