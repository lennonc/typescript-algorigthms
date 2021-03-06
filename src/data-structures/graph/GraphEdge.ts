import GraphVertex from "./GraphVertex";

export default class GraphEdge<T> {
  startVertex: GraphVertex<T>;
  endVertex: GraphVertex<T>;
  weight?: number = 0;
  /**
   * @param {GraphVertex} startVertex
   * @param {GraphVertex} endVertex
   * @param {number} [weight=1]
   */
  constructor(startVertex: GraphVertex<T>, endVertex: GraphVertex<T>, weight: number = 0) {
    this.startVertex = startVertex;
    this.endVertex = endVertex;
    this.weight = weight;
  }

  /**
   * @return {string}
   */
  getKey(): string {
    const startVertexKey = this.startVertex.getKey();
    const endVertexKey = this.endVertex.getKey();

    return `${startVertexKey}_${endVertexKey}`;
  }

  /**
   * @return {GraphEdge}
   */
  reverse(): GraphEdge<T> {
    const tmp = this.startVertex;
    this.startVertex = this.endVertex;
    this.endVertex = tmp;

    return this;
  }

  /**
   * @return {string}
   */
  toString(): string {
    return this.getKey();
  }



}
