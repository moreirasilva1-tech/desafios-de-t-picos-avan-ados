// ==========================================
// 1. MÓDULO DE ESTUDANTES (Tipagem e Arrays)
// ==========================================
export type Estudante = {
  matricula: string;
  nome: string;
  curso: string;
  ativo: boolean;
};

export function buscarEstudantePorMatricula(matricula: string, lista: Estudante[]): Estudante | null {
  const encontrado = lista.find(e => e.matricula === matricula);
  return encontrado !== undefined ? encontrado : null;
}

export function calcularMediaNotas(notas: number[]): number {
  if (notas.length === 0) return 0;
  const total = notas.reduce((soma, n) => soma + n, 0);
  return total / notas.length;
}

// ==========================================
// 2. MÓDULO DE CHAMADOS (União Estrita)
// ==========================================
export type StatusChamado = "ABERTO" | "EM_ATENDIMENTO" | "FINALIZADO";

export type Chamado = {
  id: number;
  descricao: string;
  status: StatusChamado;
};

export function atualizarStatus(chamado: Chamado, novoStatus: StatusChamado): Chamado {
  chamado.status = novoStatus;
  return chamado;
}

// ==========================================
// 3. TRATAMENTO DE ENTRADA EXTERNA (unknown)
// ==========================================
export type DadosEstudanteEntrada = {
  nome?: unknown;
  matricula?: unknown;
};

export type ResultadoValidacao = {
  valido: boolean;
  erros: string[];
};

export function validarEstudante(dados: DadosEstudanteEntrada): ResultadoValidacao {
  const erros: string[] = [];

  if (typeof dados.nome !== "string" || dados.nome.trim() === "") {
    erros.push("Nome é obrigatório e deve ser um texto.");
  }

  if (typeof dados.matricula !== "string" || dados.matricula.trim() === "") {
    erros.push("Matrícula é obrigatória e deve ser um texto.");
  }

  return {
    valido: erros.length === 0,
    erros: erros
  };
}