import updateForms from "./updateForms.js";

export default function createLocalStorage() {
  const forms = updateForms();
  const types = ["data", "valor", "local", "categoria"];
  forms.forEach((f) => {
    const dataObj = {};
    const table = f.parentElement.parentElement.lastElementChild;

    if (!table) {
      return;
    }

    const allLines = [...table.children];
    allLines.forEach((line, lineIndex) => {
      const cells = [...line.children];
      const values = cells.map((cell) => cell.textContent.trim());
      const dataLine = {};
      values.forEach((value, colunmIndex) => {
        dataLine[types[colunmIndex]] = value;
      });
      dataObj[lineIndex] = dataLine;
    });
    dataObj.tabela = table.id;

    // Only initial
    if (!localStorage.getItem(table.id)) {
      localStorage.setItem(table.id, JSON.stringify(dataObj));
    }
  });
}
