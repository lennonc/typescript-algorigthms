import LinkedList from '../LinkedList';

describe("Linked List", () => {
  it("should create a new Linked List", () => {
    const linkedList = new LinkedList();
    expect(linkedList.toString()).toBe('');
  })

  it('should append a node to a linked list', () => {
    const linkedList: LinkedList<unknown> = new LinkedList;

    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();

    linkedList.append(1);
    linkedList.append(5);

    expect(linkedList.toString()).toEqual('1,5');
    expect(linkedList?.head?.data).toEqual(1);
    expect(linkedList?.tail?.data).toEqual(5);
    expect(linkedList?.tail?.next).toBe(null);
  })

  it('should prepend a node to linked list', () => {
    const list: LinkedList<Number> = new LinkedList();

    expect(list.head).toBe(null);
    expect(list.tail).toBe(null);

    list.prepend(1);
    list.prepend(5);

    expect(list.toString()).toEqual('5,1');
  });

  it('should delete any node by value from a linked list', () => {
    const list = new LinkedList();

    expect(list.delete(5)).toBeNull();

    list.append(1)
      .append(1)
      .append(2)
      .append(3)
      .append(3)
      .append(3)
      .append(4)
      .append(5);

    expect(list?.head?.toString()).toBe('1');
    expect(list?.tail?.toString()).toBe('5');

    const deleteNode = list.delete(3);
    expect(deleteNode?.data).toBe(3);
    expect(list.toString()).toBe('1,1,2,4,5');

    list.delete(1);
    expect(list.toString()).toBe('2,4,5');

    expect(list?.head?.data).toBe(2);
    expect(list?.tail?.data).toBe(5);

    list.delete(2);
    expect(list.toString()).toBe('4,5');
    expect(list?.head?.data).toBe(4);

    list.delete(5);
    expect(list?.head?.data).toBe(4);
    expect(list?.tail?.data).toBe(4);

    list.delete(4);
    expect(list.toString()).toBe('');
  });

  it('should find a node by callback', () => {
    type ListType = {
      value: number,
      key: string
    }
    const list: LinkedList<ListType> = new LinkedList();

    list
      .append({ value: 1, key: 'test1' })
      .append({ value: 2, key: 'test2' })
      .append({ value: 3, key: 'test3' });

    const lst = list.toString();
    const comparator = (value: any) => {
      return value.key === 'test2'
    }
    const node = list.find(comparator);
    expect(node).toBeDefined();
    expect(node?.data.value).toBe(2);
    expect(node?.data.key).toBe('test2');
    expect(list.find((value) => value.key === 'test5')).toBeNull();
  });

  it('should create a linked list from an array', () => {
    const list: LinkedList<number> = new LinkedList();

    list.fromArray([1, 1, 2, 3, 3, 3, 4, 5]);
    expect(list.toString()).toBe('1,1,2,3,3,3,4,5');
  });

  it('should delete the tail of a linked list', () => {
    const list = new LinkedList();
    expect(list.deleteTail()).toBeNull();

    list.fromArray([1, 2, 5]);
    expect(list?.tail?.data).toBe(5);
    list.deleteTail();
    expect(list?.tail?.data).toBe(2);
    list.deleteTail();
    expect(list?.tail?.data).toBe(1);
    list.deleteTail();
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
  });

  it('should delete the head of a linked list', () => {
    const list = new LinkedList();
    expect(list.deleteHead()).toBeNull();

    list.append(1).append(2);

    expect(list?.head?.toString()).toBe('1');
    expect(list?.tail?.toString()).toBe('2');

    const deletedNode1 = list.deleteHead();
    expect(deletedNode1?.data).toBe(1);
    expect(list?.head?.toString()).toBe('2');

    const deletedNode2 = list.deleteHead();
    expect(deletedNode2?.data).toBe(2);
    expect(list.head).toBeNull();
  });

  it('should reverse a linked list', () => {
    const list = new LinkedList();

    list.fromArray([1, 2, 3, 4, 5]);
    expect(list.toString()).toBe('1,2,3,4,5');

    list.reverse();
    expect(list.toString()).toBe('5,4,3,2,1');
  });
})
