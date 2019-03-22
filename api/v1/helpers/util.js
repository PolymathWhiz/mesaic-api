'use strict';

module.exports = class Util {
  /**
   * @returns null if params is invalid
   * @param {*} text 
   */
  trim(text) {
    return typeof text !== undefined ? text.trim() : null;
  }
}