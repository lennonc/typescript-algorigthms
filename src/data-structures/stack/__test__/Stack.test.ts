import Stack from '../Stack';

describe('Stack', () => {
  it('should create a new stack', () => {
    const stack = new Stack();

    expect(stack).not.toBeNull();
    expect(stack.linkedList).not.toBeNull();
  });

  it('should push a value onto the stack', () => {
    const stack = new Stack();

    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.toString()).toBe('3,2,1');
  });

  it('should peek data from stack', () => {
    const stack = new Stack();

    expect(stack.peek()).toBeNull();

    stack.push(1);
    stack.push(2);

    expect(stack.peek()).toBe(2);
    expect(stack.peek()).toBe(2);
  });

  it('should be possible to push/pop objects', () => {

    type StackType = {
      value: string,
      key: string
    }
    const stack: Stack<StackType> = new Stack();

    stack.push({ value: 'test1', key: 'key1' });
    stack.push({ value: 'test2', key: 'key2' });

    const stringifier = (value: any) => `${value.key}:${value.value}`;

    expect(stack.toString(stringifier)).toBe('key2:test2,key1:test1');
    expect(stack.pop()?.value).toBe('test2');
    expect(stack.pop()?.value).toBe('test1');
  });

  it('should check if stack is empty', () => {
    const stack = new Stack();

    expect(stack.isEmpty()).toBe(true);

    stack.push(1);

    expect(stack.isEmpty()).toBe(false);
  });

  it('should pop a value from the stack', () => {
    const stack = new Stack();

    expect(stack.pop()).toBeNull();

    stack.push(1);
    stack.push(2);
    stack.push(3);

    const poppedNode = stack.pop();

    expect(poppedNode).toBe(3);
  });

  it('should convert a stack into an array', () => {
    const stack = new Stack();

    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.toArray()).toEqual([3, 2, 1]);
  });
});
