import { ArrayStack } from "../estruturas/ArrayStack.js";
import { AlteracaoCampo } from "../dominios/AlteracaoCampo.js";

/**
 * Exemplo de uso de Pilha (Stack) para funcionalidade de "Desfazer" (Undo) em formulários.
 */
export function testarHistoricoFormulario() {
  const historico = new ArrayStack<AlteracaoCampo>();

  // Usuário altera o nome
  historico.push({
    campo: "nome",
    valorAnterior: "João",
    valorNovo: "João Silva",
    dataHora: new Date(),
  });

  // Usuário altera o email
  historico.push({
    campo: "email",
    valorAnterior: "joao@old.com",
    valorNovo: "joao.silva@ifrn.edu.br",
    dataHora: new Date(),
  });

  console.log("Tamanho do histórico:", historico.size());

  // Simulando um "Ctrl+Z" (Desfazer última alteração)
  const ultimaAlteracao = historico.pop();
  console.log("Desfeito:", ultimaAlteracao);
  console.log("Histórico restante (tamanho):", historico.size());
}