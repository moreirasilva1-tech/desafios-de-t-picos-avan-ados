import { IndexQueue } from "../estruturas/IndexQueue.js";
import { Chamado } from "../dominios/Chamado.js";

/**
 * Exemplo de uso de Fila eficiente por índices (IndexQueue) para atendimento de chamados.
 */
export function testarFilaChamados() {
  const filaAtendimento = new IndexQueue<Chamado>();

  filaAtendimento.enqueue({ id: 1, titulo: "Erro no Matrícula Online", solicitante: "Carlos", status: "Aberto" });
  filaAtendimento.enqueue({ id: 2, titulo: "Lentidão no AVA", solicitante: "Ana", status: "Aberto" });

  console.log("Próximo chamado a ser atendido:", filaAtendimento.front());
  console.log("Total na fila:", filaAtendimento.size());

  // Atendendo o primeiro da fila
  const chamadoAtendido = filaAtendimento.dequeue();
  console.log("Chamado atendido:", chamadoAtendido?.titulo);
  console.log("Restantes na fila:", filaAtendimento.size());
}