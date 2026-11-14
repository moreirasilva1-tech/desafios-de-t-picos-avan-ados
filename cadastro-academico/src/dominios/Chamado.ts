import { StatusChamado } from "../desafio_5.js"; // ou define localmente se preferires

export interface Chamado {
  id: number;
  titulo: string;
  solicitante: string;
  status: string; // ou StatusChamado
}