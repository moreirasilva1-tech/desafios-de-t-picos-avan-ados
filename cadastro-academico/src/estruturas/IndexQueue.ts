import { Queue } from "./Queue.js";

/**
 * Implementação eficiente de Fila baseada em ponteiros (índices de início e fim).
 * Complexidade: enqueue O(1), dequeue O(1), front O(1).
 */
export class IndexQueue<T> implements Queue<T> {
  private items: Record<number, T> = {};
  private inicio = 0;
  private fim = 0;

  enqueue(item: T): void {
    this.items[this.fim] = item;
    this.fim++;
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const item = this.items[this.inicio];
    delete this.items[this.inicio];
    this.inicio++;
    return item;
  }

  front(): T | undefined {
    return this.items[this.inicio];
  }

  isEmpty(): boolean {
    return this.fim - this.inicio === 0;
  }

  size(): number {
    return this.fim - this.inicio;
  }
}