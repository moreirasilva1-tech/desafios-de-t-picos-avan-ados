import { criarAluno } from "../models/aluno.js";
import * as AlunoRepository from "../repositories/alunoRepository.js";
import { calcularMedia, classificarMedia } from "../utils/calculos.js";
import { validarDadosDoAluno, normalizarDadosDoAluno } from "../utils/validacoes.js";

/**
 * Cadastra um novo aluno no sistema.
 * @param {Object} dados - Dados brutos do aluno.
 * @returns {Object} Resultado do cadastro.
 */
export function cadastrarAluno(dados) {
  const dadosNormalizados = normalizarDadosDoAluno(dados);
  const erros = validarDadosDoAluno(dadosNormalizados);

  if (erros.length > 0) {
    return { sucesso: false, erros, aluno: null };
  }

  const alunoExistente = AlunoRepository.buscarPorMatricula(dadosNormalizados.matricula);
  if (alunoExistente) {
    return { sucesso: false, erros: ["Matrícula já cadastrada."], aluno: null };
  }

  const aluno = criarAluno({
    id: AlunoRepository.obterProximoId(),
    ...dadosNormalizados,
  });

  AlunoRepository.salvar(aluno);
  return {
    sucesso: true,
    erros: [],
    aluno: adicionarSituacao(aluno),
  };
}

/**
 * Adiciona média e situação ao objeto do aluno de forma imutável.
 * @param {Object} aluno - Objeto aluno.
 * @param {number} [mediaMinima=6] - Média mínima configurável.
 * @returns {Object} Novo objeto com média e situação.
 */
export function adicionarSituacao(aluno, mediaMinima = 6) {
  const media = calcularMedia(aluno.notas);
  return {
    ...aluno,
    notas: [...aluno.notas],
    media,
    situacao: classificarMedia(media, mediaMinima),
  };
}

export function listarAlunosComSituacao(mediaMinima = 6) {
  return AlunoRepository.listarTodos().map((aluno) => adicionarSituacao(aluno, mediaMinima));
}

export function buscarAlunoPorMatricula(matricula) {
  const aluno = AlunoRepository.buscarPorMatricula(matricula);
  return aluno ? adicionarSituacao(aluno) : null;
}

export function removerAlunoPorMatricula(matricula) {
  return AlunoRepository.removerPorMatricula(matricula);
}

/**
 * HOF com Closure para criar filtros dinâmicos reutilizáveis.
 * @param {string} tipo - "mediaMinima" ou "curso".
 * @param {number|string} valor - Valor base do filtro.
 * @returns {Function} Função de filtro.
 */
export function criarFiltro(tipo, valor) {
  if (tipo === "mediaMinima") {
    return (aluno) => aluno.media >= valor;
  }
  if (tipo === "curso") {
    return (aluno) => aluno.curso.toUpperCase() === String(valor).toUpperCase();
  }
  return () => true;
}

/**
 * Gera um relatório genérico configurável com callbacks.
 * @param {Array} alunos - Lista de alunos.
 * @param {Function} filtrar - Callback de filtro.
 * @param {Function} formatar - Callback de formatação de saída.
 * @param {Function} [comparar] - Callback de ordenação (opcional).
 * @returns {Array|string} Relatório processado.
 */
export function gerarRelatorio(alunos, filtrar, formatar, comparar) {
  if (!Array.isArray(alunos) || alunos.length === 0) {
    return "Nenhum dado disponível para gerar o relatório.";
  }

  let processados = alunos.filter(filtrar);

  if (comparar && typeof comparar === "function") {
    processados = [...processados].sort(comparar);
  }

  return formatar(processados);
}