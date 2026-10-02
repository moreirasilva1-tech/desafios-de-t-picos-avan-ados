/**
 * Normaliza os dados brutos do aluno.
 * @param {Object} dados - Dados brutos recebidos.
 * @returns {Object} Dados higienizados.
 */
export function normalizarDadosDoAluno(dados) {
  return {
    ...dados,
    matricula: String(dados.matricula ?? "").trim(),
    nome: String(dados.nome ?? "").trim(),
    email: String(dados.email ?? "").trim().toLowerCase(),
    curso: String(dados.curso ?? "TADS").trim().toUpperCase(),
    notas: Array.isArray(dados.notas) ? [...dados.notas] : [],
  };
}

/**
 * Valida as regras de negócio para os dados do aluno.
 * @param {Object} dados - Dados a serem validados.
 * @returns {string[]} Array com as mensagens de erro (vazio se estiver tudo certo).
 */
export function validarDadosDoAluno(dados) {
  const erros = [];

  if (!dados.matricula || dados.matricula.length < 4) {
    erros.push("A matrícula deve possuir pelo menos 4 caracteres.");
  }
  if (!dados.nome || dados.nome.length < 3) {
    erros.push("O nome deve possuir pelo menos 3 caracteres.");
  }
  if (!dados.email || !dados.email.includes("@") || !dados.email.includes(".")) {
    erros.push("O e-mail informado é inválido.");
  }

  const notasValidas = dados.notas.every(
    (nota) => typeof nota === "number" && nota >= 0 && nota <= 10
  );
  if (!notasValidas) {
    erros.push("Todas as notas devem ser números entre 0 e 10.");
  }

  return erros;
}