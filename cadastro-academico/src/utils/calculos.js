/**
 * Calcula a média aritmética de um array de notas.
 * @param {number[]} notas - Array com as notas do aluno.
 * @returns {number} Média aritmética (ou 0 se o array estiver vazio).
 */
export function calcularMedia(notas) {
  if (!Array.isArray(notas) || notas.length === 0) return 0;
  const soma = notas.reduce((acc, nota) => acc + nota, 0);
  return soma / notas.length;
}

/**
 * Classifica a situação do aluno com base na média obtida e média mínima configurável.
 * @param {number} media - Média do aluno.
 * @param {number} [mediaMinima=6] - Média mínima para aprovação (padrão: 6).
 * @returns {string} "APROVADO" ou "REPROVADO".
 */
export function classificarMedia(media, mediaMinima = 6) {
  return media >= mediaMinima ? "APROVADO" : "REPROVADO";
}