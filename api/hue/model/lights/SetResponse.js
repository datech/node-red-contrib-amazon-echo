/**
 * Response for setter-endpoint.
 */
module.exports = class SetResponse extends Array {
  /**
   * Add a success field to the response.
   *
   * @param {string} attr Attribute that has been set successfully.
   * @param {*}      val  The new value.
   */
  success(attr, val) {
    this.push({
      success: {
        ['/lights/1/state/' + attr]: val
      }
    });
  }

  /**
   * Add a error field to the response.
   *
   * @param {string} attr Attribute that has been set successfully.
   * @param {*}      val  The new value.
   */
  error(attr, val) {
    this.push({
      error: {
        ['/lights/1/state/' + attr]: val
      }
    });
  }
};
