export default function handleRenderLocalStorage() {
  function renderTable(key, value) {
    const formName = key.split("-")[1];
    const table = document.querySelector("#tabela-" + formName);
    const allLines = [...table.children];
    const arrayValues = [...Object.values(value)].map(
      (v) => (v = Object.values(v).join("")),
    );

    allLines.forEach((line) => {
      const l = line.innerText.split("\n").join("");
      for (let i = 0; i < arrayValues.length; i++) {
        if (l === arrayValues[i]) {
          line.style.display = "grid";
          break;
        } else {
          line.style.display = "none";
        }
      }
    });
  }

  const lSItens = { ...localStorage };
  for (let i = 0; i < Object.entries(lSItens).length; i++) {
    const lSKey = Object.entries(lSItens)[i][0];
    const lSValue = JSON.parse(localStorage.getItem(lSKey));
    renderTable(lSKey, lSValue);
  }
}
