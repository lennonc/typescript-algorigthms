import LinkedList from "../linked-list/LinkedList";
import IStack from "./IStack";

export default class Stack<T> implements IStack<T> {
  public linkedList: LinkedList<T>;

  constructor() {
    this.linkedList = new LinkedList();
  }

  isEmpty(): boolean {
    return !this.linkedList.head;
  }

  peek(): T | null {
    if (!this.linkedList.head) {
      return null;
    }

    return this.linkedList.head.data;
  }

  push(value: T) {
    this.linkedList.prepend(value);
  }

  pop(): T | null {
    const removedHead = this.linkedList.deleteHead();
    return removedHead ? removedHead.data : null;
  }

  toArray(): T[] {
    return this
      .linkedList
      .toArray()
      .map((node) => node.data);
  }

  toString(callback?: any): string {
    return callback
      ? this.linkedList.toString(callback)
      : this.linkedList.toString();
  }
}
