import {
  cadastrarAluno,
  listarAlunosComSituacao,
  gerarRelatorio,
  criarFiltro,
} from "./services/alunoService.js";
import { exibirResultadoCadastro, exibirRelatorio } from "./ui/consoleUI.js";

// 1. Cadastrar Alunos
console.log("--- CADASTRANDO ALUNOS ---");
exibirResultadoCadastro(
  cadastrarAluno({
    matricula: "2026001",
    nome: "Ana Silva",
    email: "ana@email.com",
    curso: "TADS",
    notas: [8, 9, 7],
  })
);

exibirResultadoCadastro(
  cadastrarAluno({
    matricula: "2026002",
    nome: "Bruno Costa",
    email: "bruno@email.com",
    curso: "TADS",
    notas: [4, 5, 3],
  })
);

exibirResultadoCadastro(
  cadastrarAluno({
    matricula: "2026003",
    nome: "Carla Souza",
    email: "carla@email.com",
    curso: "ENG",
    notas: [9, 10, 8.5],
  })
);

exibirResultadoCadastro(
  cadastrarAluno({
    matricula: "2026004",
    nome: "Daniel Lima",
    email: "daniel@email.com",
    curso: "TADS",
    notas: [5, 4, 6],
  })
);

// Testando caso limite: aluno sem notas
exibirResultadoCadastro(
  cadastrarAluno({
    matricula: "2026005",
    nome: "Eduardo Rocha",
    email: "eduardo@email.com",
    curso: "ENG",
    notas: [],
  })
);

const todosAlunos = listarAlunosComSituacao(6);

// RELATÓRIO 1: Aprovados ordenados por nome
const relatorio1 = gerarRelatorio(
  todosAlunos,
  (aluno) => aluno.situacao === "APROVADO",
  (lista) => lista.map((a) => a.nome + " | Curso: " + a.curso + " | Média: " + a.media.toFixed(1)),
  (a, b) => a.nome.localeCompare(b.nome)
);
exibirRelatorio("1. APROVADOS POR NOME", relatorio1);

// RELATÓRIO 2: Reprovados da menor para a maior média
const relatorio2 = gerarRelatorio(
  todosAlunos,
  (aluno) => aluno.situacao === "REPROVADO",
  (lista) => lista.map((a) => a.nome + " | Média: " + a.media.toFixed(1) + " | Situação: " + a.situacao),
  (a, b) => a.media - b.media
);
exibirRelatorio("2. REPROVADOS POR MENOR MÉDIA", relatorio2);

// RELATÓRIO 3: Alunos de TADS em CSV (usando HOF/Closure)
const filtroTADS = criarFiltro("curso", "TADS");
const relatorio3 = gerarRelatorio(
  todosAlunos,
  filtroTADS,
  (lista) => [
    "Matricula;Nome;Email;Curso;Media",
    ...lista.map((a) => a.matricula + ";" + a.nome + ";" + a.email + ";" + a.curso + ";" + a.media.toFixed(1)),
  ].join("\n")
);
exibirRelatorio("3. ALUNOS DE TADS (FORMATO CSV)", relatorio3);

// RELATÓRIO 4: Resumo por Curso com quantidade e média geral
const gerarResumoPorCurso = (alunos) => {
  const cursos = alunos.reduce((acc, aluno) => {
    if (!acc[aluno.curso]) {
      acc[aluno.curso] = { totalNotas: 0, quantidadeAlunos: 0 };
    }
    acc[aluno.curso].totalNotas += aluno.media;
    acc[aluno.curso].quantidadeAlunos += 1;
    return acc;
  }, {});

  return Object.entries(cursos).map(([curso, dados]) => {
    const mediaGeral = dados.totalNotas / dados.quantidadeAlunos;
    return "Curso: " + curso + " | Qtd Alunos: " + dados.quantidadeAlunos + " | Média Geral: " + mediaGeral.toFixed(1);
  });
};

const relatorio4 = gerarRelatorio(
  todosAlunos,
  () => true,
  gerarResumoPorCurso
);
exibirRelatorio("4. RESUMO POR CURSO", relatorio4);