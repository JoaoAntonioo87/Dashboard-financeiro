import updateForms from "./updateForms.js";

export default function createLocalStorage() {
  const forms = updateForms();
  const types = ["data", "valor", "local", "categoria"];
  const dataObj = {};
  forms.forEach((f) => {
    const table = f.parentElement.parentElement.lastElementChild;
    const allLines = [...table.children];
    allLines.forEach((line, index) => {
      const contentLine = line.innerText.replaceAll("\n", " ").split("  ");
      const dataLine = {};
      contentLine.forEach((e, index) => {
        dataLine[types[index]] = e;
      });
      dataObj[index] = dataLine;
    });
    dataObj.tabela = table.id;
    if (!localStorage.getItem(table.id)) {
      localStorage.setItem(table.id, JSON.stringify(dataObj));
    }
  });
}
