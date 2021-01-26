export default interface IQueue<T> {
  isEmpty(): boolean;
  enqueue(data: T): void;
  dequeue(): T | null;
  peek(): T | null;
  toString(callback?: any): string;
}
