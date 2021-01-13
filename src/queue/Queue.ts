import LinkedList from "../linked-list/LinkedList";
import IQueue from './IQueue';

export default class Queue<T> implements IQueue<T> {
  public linkedList: LinkedList<any>;
  constructor() {
    this.linkedList = new LinkedList();
  }

  isEmpty(): boolean {
    return !this.linkedList.head;
  }

  enqueue(data: T): void {
    this.linkedList.append(data);
  }

  dequeue(): T | null {
    const removedNode = this.linkedList.deleteHead();
    return removedNode ? removedNode.data : null;
  }

  peek(): T | null {
    if (!this.linkedList.head) {
      return null;
    }

    return this.linkedList.head.data;
  }

  toString(callback?: any): string {
    return callback
      ? this.linkedList.toString(callback)
      : this.linkedList.toString();
  }
}
