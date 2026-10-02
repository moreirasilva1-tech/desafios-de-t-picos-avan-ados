const alunos = [];
let proximoId = 1;

/**
 * Gera e incrementa o próximo ID sequencial.
 * @returns {number} Próximo ID.
 */
export function obterProximoId() {
  const idAtual = proximoId;
  proximoId += 1;
  return idAtual;
}

/**
 * Salva um aluno no repositório.
 * @param {Object} aluno - Objeto aluno a salvar.
 * @returns {Object} O aluno salvo.
 */
export function salvar(aluno) {
  alunos.push(aluno);
  return aluno;
}

/**
 * Busca um aluno pela matrícula.
 * @param {string} matricula - Matrícula para busca.
 * @returns {Object|null} Cópia do aluno ou null se não for encontrado.
 */
export function buscarPorMatricula(matricula) {
  const aluno = alunos.find((a) => a.matricula === matricula);
  if (!aluno) return null;
  return { ...aluno, notas: [...aluno.notas] };
}

/**
 * Retorna uma cópia defensiva de todos os alunos.
 * @returns {Array} Lista de alunos.
 */
export function listarTodos() {
  return alunos.map((aluno) => ({
    ...aluno,
    notas: [...aluno.notas],
  }));
}

/**
 * Remove um aluno pela matrícula.
 * @param {string} matricula - Matrícula a remover.
 * @returns {boolean} True se removeu, false caso contrário.
 */
export function removerPorMatricula(matricula) {
  const indice = alunos.findIndex((a) => a.matricula === matricula);
  if (indice === -1) return false;
  alunos.splice(indice, 1);
  return true;
}