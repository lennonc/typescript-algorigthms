export default class Comparator {

  compare: any;
  /**
   * @param {function(a: *, b: *)} [compareFunction] - It may be custom compare function that, let's
   * say may compare custom objects together.
   */
  constructor(compareFunction: any) {
    this.compare = compareFunction || Comparator.defaultCompareFunction;
  }

  /**
  * Default comparison function. It just assumes that "a" and "b" are strings or numbers.
  * @param {(string|number)} a
  * @param {(string|number)} b
  * @returns {number}
  */
  static defaultCompareFunction(a: any, b: any) {
    if (a === b) {
      return 0;
    }

    return a < b ? -1 : 1;
  }

  equal(a: any, b: any) {
    return this.compare(a, b) === 0;
  }
}
