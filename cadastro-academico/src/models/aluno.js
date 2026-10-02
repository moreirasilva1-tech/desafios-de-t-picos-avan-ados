/**
 * @typedef {Object} Aluno
 * @property {number} id - Identificador único do aluno.
 * @property {string} matricula - Matrícula do aluno.
 * @property {string} nome - Nome do aluno.
 * @property {string} email - Endereço eletrônico.
 * @property {string} curso - Sigla do curso.
 * @property {number[]} notas - Array com as notas do aluno.
 */

/**
 * Cria uma representação imutável de um aluno.
 *
 * @param {Aluno} dados - Dados do aluno.
 * @returns {Aluno} Objeto aluno criado.
 */
export function criarAluno({ id, matricula, nome, email, curso, notas = [] }) {
  return {
    id,
    matricula,
    nome,
    email,
    curso,
    notas: [...notas], // Cópia defensiva para garantir a imutabilidade
  };
}