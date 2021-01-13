export default interface IStack<T> {
  isEmpty(): boolean;
  peek(): T | null;
  push(value: T): void;
  pop(): T | null;
  toArray(): T[];
  toString(callback?: any): string;
}
