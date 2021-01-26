import { ILinkedList } from "./ILinkedList";
import Node from './Node';
import Comparator from '../utils/Comparator';

export default class LinkedList<T> implements ILinkedList<T> {
  head: Node<T> | null = null;
  tail: Node<T> | null = null;
  compare: any

  constructor(comparator?: any) {

    this.head = null;
    this.tail = null;
    this.compare = new Comparator(comparator);
  }

  append(value: T): LinkedList<T> {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;

      return this;
    }

    const getLast = (node: Node<T>): Node<T> => {
      return node.next ? getLast(node.next) : node;
    };

    const lastNode = getLast(this.head);
    // node.prev = lastNode;
    lastNode.next = node;
    this.tail = node;

    return this;
  }

  prepend(value: T): LinkedList<T> {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;

      return this;
    }

    node.next = this.head;
    this.head = node;

    return this;
  }

  find(comparator: (data: T) => boolean): Node<T> | null {
    const checkNext = (node: Node<T>): Node<T> | null => {
      if (comparator(node.data)) {
        return node;
      }
      return node.next ? checkNext(node.next) : null;
    };

    return this.head ? checkNext(this.head) : null;
  }

  /**
   * Delete a node by value
   * @param { * } value
   */
  delete(value: T): Node<T> | null {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;

    // If we're deleting the head. Make the next node the head
    while (this.head && this.compare.equal(this.head.data, value)) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode) {
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.data, value)) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode?.next
        }
      }
    }

    // Check if we need to delete the tail
    if (this.compare.equal(this.tail?.data, value)) {
      this.tail = currentNode;
    }

    return deletedNode;
  }

  /**
   * @returns Node<T>
   */
  deleteTail(): Node<T> | null {

    const deletedTail = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return deletedTail;
    }

    let currentNode = this.head;

    while (currentNode?.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;
    return deletedTail;
  }

  deleteHead(): Node<T> | null {
    const deletedHead = this.head;

    if (!this.head) {
      return null;
    }

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  reverse(): LinkedList<T> {
    let currentNode = this.head;
    let nextNode = null;
    let previousNode = null;

    while (currentNode) {
      nextNode = currentNode.next;
      currentNode.next = previousNode;
      previousNode = currentNode;
      currentNode = nextNode;
    }

    this.tail = this.head;
    this.head = previousNode;

    return this;
  }

  toString(callback?: any): string {
    return this.toArray().map(node => node.toString(callback)).toString();
  }

  toArray(): Node<T>[] {
    const nodes: Node<T>[] = [];

    let currentNode = this.head;

    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next
    }

    return nodes;
  }

  fromArray(array: T[]): LinkedList<T> {
    array.forEach(element => this.append(element));

    return this;
  }
}
