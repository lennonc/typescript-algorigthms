import LinkedList from './LinkedList';
import Node from './Node';

export interface ILinkedList<T> {
  prepend(data: T): LinkedList<T>;
  append(data: T): LinkedList<T>;
  delete(value: T): Node<T> | null;
  // size(): number;
  find(comparator: (data: T) => boolean): Node<T> | null;
  toString(callback: any): string;
}
