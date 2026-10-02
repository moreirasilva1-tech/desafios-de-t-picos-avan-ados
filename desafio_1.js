const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function pergunta(texto) {
  return new Promise((resolve) => rl.question(texto, resolve));
}

function calcularMedia(n1, n2, n3) {
  return (n1 + n2 + n3) / 3;
}

function classificarSituacao(media, frequencia) {
  if (media >= 70 && frequencia >= 75) {
    return "Aprovado";
  } else if (media >= 40 && media < 70 && frequencia >= 75) {
    return "Recuperação";
  } else {
    return "Reprovado";
  }
}

async function principal() {
  let totalAlunos = Number(await pergunta("Digite o número de alunos cadastrados: "));
  let alunos = [];

  for (let i = 0; i < totalAlunos; i++) {
    console.log(`\n--- Aluno ${i + 1} ---`);
    let nome = await pergunta("Digite seu nome: ");
    let matricula = await pergunta("Digite sua matrícula: ");
    let nota1 = Number(await pergunta("Digite a primeira nota: "));
    let nota2 = Number(await pergunta("Digite a segunda nota: "));
    let nota3 = Number(await pergunta("Digite a terceira nota: "));
    let frequencia = Number(await pergunta("Digite a frequência (%): "));

    let media = calcularMedia(nota1, nota2, nota3);
    let situacao = classificarSituacao(media, frequencia);

    alunos.push({
      nome: nome,
      matricula: matricula,
      media: media,
      situacao: situacao,
    });
  }

  rl.close();

  let aprovados = 0;
  let recuperacao = 0;
  let reprovados = 0;

  console.log("\n=== RELATÓRIO DE ALUNOS ===");

  for (let i = 0; i < alunos.length; i++) {
    let a = alunos[i];
    console.log(
      "Nome: " + a.nome +
      " | Matrícula: " + a.matricula +
      " | Média: " + a.media.toFixed(2) +
      " | Situação: " + a.situacao
    );

    if (a.situacao === "Aprovado") {
      aprovados++;
    } else if (a.situacao === "Recuperação") {
      recuperacao++;
    } else {
      reprovados++;
    }
  }

  console.log("\n=== RESUMO ===");
  console.log("Total Aprovados: " + aprovados);
  console.log("Total em Recuperação: " + recuperacao);
  console.log("Total Reprovados: " + reprovados);
}

principal();