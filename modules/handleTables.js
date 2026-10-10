export default function handleTables() {
  const receitasHtml = Array.from(
    document.querySelectorAll("#tabela-receitas .linha-tabela"),
  );

  const despesasHtml = Array.from(
    document.querySelectorAll("#tabela-despesas .linha-tabela"),
  );

  function handleLinha(array) {
    const objLinhas = {};

    array.forEach((e, index) => {
      const elementos = Array.from(e.children);
      const chaves = ["data", "valor", "local", "categoria"];
      const linha = {};

      elementos.forEach((e, index) => {
        if (e.dataset.filterType == "value") {
          linha[chaves[index]] = Number(e.innerText);
        } else {
          linha[chaves[index]] = e.innerText;
        }
      });

      objLinhas[index] = linha;
    });

    return objLinhas;
  }

  const receitas = handleLinha(receitasHtml);
  const despesas = handleLinha(despesasHtml);

  return { receitas, despesas };
}
