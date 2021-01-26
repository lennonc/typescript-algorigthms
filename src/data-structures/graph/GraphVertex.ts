import LinkedList from "../linked-list/LinkedList";
import LinkedListNode from "../linked-list/Node";
import GraphEdge from "./GraphEdge";

export default class GraphVertex<T> {
  edges: LinkedList<GraphEdge<T>>;
  value: T;
  /**
   * @param {*} value
   */
  constructor(value?: T) {
    if (value === undefined) {
      throw new Error('Graph vertex must have a value');
    }

    /**
     * @param {GraphEdge} edgeA
     * @param {GraphEdge} edgeB
     */
    const edgeComparator = (edgeA: GraphEdge<T>, edgeB: GraphEdge<T>) => {
      if (edgeA.getKey() === edgeB.getKey()) {
        return 0;
      }

      return edgeA.getKey() < edgeB.getKey() ? -1 : 1;
    };

    // Normally you would store string value like vertex name.
    // But generally it may be any object as well
    this.value = value;
    this.edges = new LinkedList(edgeComparator);
  }

  /**
   * @param {GraphEdge} edge
   * @returns {GraphVertex}
   */
  addEdge(edge: GraphEdge<T>): GraphVertex<T> {
    this.edges.append(edge);

    return this;
  }

  /**
   * @param {GraphEdge} edge
   */
  deleteEdge(edge: GraphEdge<T>): void {
    this.edges.delete(edge);
  }

  /**
   * @returns {GraphVertex[]}
   */
  getNeighbors(): GraphVertex<T>[] {
    const edges = this.edges.toArray();

    /** @param {LinkedListNode} node */
    const neighborsConverter = (node: LinkedListNode<GraphEdge<T>>) => {
      return node.data.startVertex === this ? node.data.endVertex : node.data.startVertex;
    };

    // Return either start or end vertex.
    // For undirected graphs it is possible that current vertex will be the end one.
    return edges.map(neighborsConverter);
  }

  /**
   * @return {GraphEdge[]}
   */
  getEdges(): GraphEdge<T>[] {
    return this.edges.toArray().map((linkedListNode) => linkedListNode.data);
  }

  /**
   * @return {number}
   */
  getDegree(): number {
    return this.edges.toArray().length;
  }

  /**
   * @param {GraphEdge} requiredEdge
   * @returns {boolean}
   */
  hasEdge(requiredEdge: GraphEdge<T>): boolean {
    const edgeNode = this.edges.find(
      (edge: GraphEdge<T>) => edge === requiredEdge,
    );

    return !!edgeNode;
  }

  /**
   * @param {GraphVertex} vertex
   * @returns {boolean}
   */
  hasNeighbor(vertex: GraphVertex<T>): boolean {
    const vertexNode = this.edges.find(
      (edge) => edge.startVertex === vertex || edge.endVertex === vertex,
    );

    return !!vertexNode;
  }

  /**
   * @param {GraphVertex} vertex
   * @returns {(GraphEdge|null)}
   */
  findEdge(vertex: GraphVertex<T>): GraphEdge<T> | null {
    const edgeFinder = (edge: GraphEdge<T>) => {
      return edge.startVertex === vertex || edge.endVertex === vertex;
    };

    const edge = this.edges.find(edgeFinder);

    return edge ? edge.data : null;
  }

  /**
  * @returns {string}
  */
  getKey(): T {
    return this.value;
  }

  /**
   * @return {GraphVertex}
   */
  deleteAllEdges() {
    this.getEdges().forEach((edge) => this.deleteEdge(edge));

    return this;
  }

  /**
   * @param {function} [callback]
   * @returns {string}
   */
  toString(callback?: any): string {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
