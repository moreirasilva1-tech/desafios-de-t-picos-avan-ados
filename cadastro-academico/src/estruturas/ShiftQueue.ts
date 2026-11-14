import { Queue } from "./Queue.js";

/**
 * Implementação de Fila ingênua utilizando Array.prototype.shift().
 * Complexidade: enqueue O(1), dequeue O(n) — pois realoca todos os índices restantes.
 */
export class ShiftQueue<T> implements Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  front(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}