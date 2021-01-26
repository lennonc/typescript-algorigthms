export default class Node<T> {
  public next: Node<T> | null = null;
  public prev: Node<T> | null = null;

  constructor(public data: T, next?: Node<T>) {
    this.data = data;
    if (next) {
      this.next = next;
    }
  }

  toString(callback?: any) {
    return callback ? callback(this.data) : `${this.data}`
  }
}
