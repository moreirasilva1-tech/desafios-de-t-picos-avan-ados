/**
 * Representa uma alteração em um campo de formulário para o histórico (Pilha).
 */
export interface AlteracaoCampo {
  campo: string;
  valorAnterior: string;
  valorNovo: string;
  dataHora: Date;
}