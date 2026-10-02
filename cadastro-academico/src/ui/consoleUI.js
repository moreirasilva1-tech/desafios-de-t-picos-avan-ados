/**
 * Exibe o resultado do cadastro.
 * @param {Object} resultado - Retorno da função cadastrarAluno.
 */
export function exibirResultadoCadastro(resultado) {
  if (!resultado.sucesso) {
    console.error("❌ Falha no cadastro:");
    resultado.erros.forEach((e) => console.error(`   - ${e}`));
    return;
  }
  console.log(`✅ Aluno(a) ${resultado.aluno.nome} cadastrado(a) com sucesso!`);
}

/**
 * Exibe um relatório genérico formatado no console.
 * @param {string} titulo - Título do relatório.
 * @param {string|Array} conteudo - Conteúdo processado.
 */
export function exibirRelatorio(titulo, conteudo) {
  console.log(`\n============== ${titulo} ==============`);
  if (typeof conteudo === "string") {
    console.log(conteudo);
  } else if (Array.isArray(conteudo)) {
    conteudo.forEach((item) => console.log(item));
  }
  console.log("==================================================");
}