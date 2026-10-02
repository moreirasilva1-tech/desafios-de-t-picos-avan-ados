const cursos = [];
function inserirCurso(cursos, codigo, nome, cargaHoraria, ativo) {
    cursos.push({ codigo, nome, cargaHoraria, ativo });
}
function listarCursos(cursos) {
    for ( const curso of cursos) {
        console.log(`Código: ${curso.codigo} | Nome: ${curso.nome} | Horas: ${curso.cargaHoraria} | Ativo: ${curso.ativo}`);
    }
}
function filtrarCursosAtivos(cursos) {
    return cursos.filter((curso) => curso.ativo === true);
}

function calcularMediaCargaHoraria(cursosAtivos) {
    if (cursosAtivos.length === 0) return 0;

    const somaHoras = cursosAtivos.reduce((acumulador, curso) => acumulador + curso.cargaHoraria, 0);
    return somaHoras / cursosAtivos.length;

}
inserirCurso(cursos, "CC01", "Algoritmos", 80, true);
inserirCurso(cursos, "CC02", "Banco de Dados", 60, true);
inserirCurso(cursos, "CC03", "Design UX", 40, false);

console.log("--- LISTA DE CURSOS ---");
listarCursos(cursos);

const ativos = filtrarCursosAtivos(cursos);
const media = calcularMediaCargaHoraria(ativos);

console.log("\n--- RELATÓRIO ---");
console.log(`Total de cursos: ${cursos.length}`);
console.log(`Cursos ativos: ${ativos.length}`);
console.log(`Média da carga horária dos ativos: ${media}h`);