/**
 * Registration response.
 */
module.exports = class Registration extends Array {
  /**
   * Add username to success list.
   *
   * @param {string} username Registered username.
   */
  success(username) {
    this.push({
      success: {
        username: username
      }
    })
  }
};
