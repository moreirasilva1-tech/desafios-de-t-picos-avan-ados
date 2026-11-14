import { ShiftQueue } from "../estruturas/ShiftQueue.js";
import { IndexQueue } from "../estruturas/IndexQueue.js";

/**
 * Demonstração qualitativa e comparativa entre ShiftQueue e IndexQueue.
 * 
 * Justificativa:
 * - ShiftQueue (Array.prototype.shift): Tem custo O(n) na remoção (dequeue), pois obriga 
 *   a realocação de todos os elementos restantes do array para os índices anteriores.
 * - IndexQueue (Ponteiros de início/fim): Tem custo O(1) na remoção e inserção, pois apenas 
 *   atualiza o ponteiro de início ou armazena na chave do objeto/array sem deslocar dados.
 */
export function compararDesempenhoFilas() {
  console.log("--- Comparação de Filas ---");
  console.log("ShiftQueue: Operação dequeue custa O(n) devido à realocação de índices.");
  console.log("IndexQueue: Operação dequeue custa O(1) através de controle de ponteiros.");
}