import Node from '../Node';

describe('Node', () => {
  it('should create a new node', () => {
    const node: Node<number> = new Node(1);
    expect(node.data).toBe(1);
    expect(node.next).toBe(null);
  })

  it('should create a node with an object', () => {
    const node: Node<any> = new Node({ key: 'test', value: 1 });
    expect(node.data.value).toBe(1);
    expect(node.data.key).toBe('test');
    expect(node.next).toBe(null);
  })

  it('should link nodes together', () => {
    const node2: Node<number> = new Node(2);
    const node1: Node<number> = new Node(1, node2);

    expect(node1.next).toBeDefined();
    expect(node2.next).toBeNull();
    expect(node1.data).toBe(1);
    expect(node1?.next?.data).toBe(2);
  });

  it('should convert node to string', () => {
    const node = new Node(1);
    expect(node.toString()).toBe('1');

    const node2 = new Node('value');
    node2.data = 'string value';
    expect(node2.toString()).toBe('string value');
  });

  it('should convert node to string with custom stringifier', () => {
    const nodeValue = { value: 1, key: 'test' };
    const node: Node<any> = new Node(nodeValue);
    const toStringCallback = (value: any) => `value: ${value.value}, key: ${value.key}`;

    expect(node.toString(toStringCallback)).toBe('value: 1, key: test');
  });
})
