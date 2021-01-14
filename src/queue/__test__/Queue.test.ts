import Queue from '../Queue';
describe("Queue", () => {
  it('should create a new queue', () => {
    const queue = new Queue();
    expect(queue).not.toBeNull();
    expect(queue.linkedList).not.toBeNull();
  });

  it('should enqueue an element to the queue', () => {
    const queue = new Queue();

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.toString()).toBe('1,2');
  });

  it('should peek at the head of the queue', () => {
    const queue = new Queue();

    expect(queue.peek()).toBeNull();

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.peek()).toBe(1);
    expect(queue.peek()).toBe(1);
  });

  it('should be possible to enqueue/dequeue objects', () => {
    type QueueType = {
      value: string,
      key: string
    }

    const queue: Queue<QueueType> = new Queue();

    queue.enqueue({ value: 'test1', key: 'key1' });
    queue.enqueue({ value: 'test2', key: 'key2' });

    const stringifier = (value: any) => `${value.key}:${value.value}`;

    expect(queue.toString(stringifier)).toBe('key1:test1,key2:test2');
    expect(queue.dequeue()?.value).toBe('test1');
    expect(queue.dequeue()?.value).toBe('test2');
    expect(queue.dequeue()?.value).toBeNull;
  });

  it('should check if queue is empty', () => {
    const queue = new Queue();

    expect(queue.isEmpty()).toBe(true);

    queue.enqueue(1);

    expect(queue.isEmpty()).toBe(false);
  });

  it('should dequeue from queue in FIFO order', () => {
    const queue = new Queue();

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBeNull();
    expect(queue.isEmpty()).toBe(true);
  });
})
