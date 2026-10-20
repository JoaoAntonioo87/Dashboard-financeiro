import handleRenderLocalStorage from "./handleRenderLocalStorage.js";

export default function handleNewLineTable(data) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("linha-tabela");

  let tableId = "";

  for (let item in data) {
    if (item == "data") {
      const date = data[item].split("-").reverse().join("/");
      const newElement = document.createElement("p");
      newElement.classList.add(item);
      newElement.innerText = date;
      newDiv.prepend(newElement);
    } else if (item != "tabela") {
      const newElement = document.createElement("p");
      newElement.classList.add(item);

      if (Number(data[item])) {
        newElement.innerText = Number(data[item]);
      }
      newElement.innerText =
        data[item].charAt(0).toUpperCase() + data[item].slice(1);
      newDiv.appendChild(newElement);
    } else {
      tableId = "tabela-" + data[item];
    }
  }

  const table = document.querySelector("#" + tableId);
  table.appendChild(newDiv);

  const lsOld = JSON.parse(localStorage.getItem("tabela-" + data.tabela)) || {};
  lsOld[Object.keys(lsOld).length + 1] = data;
  localStorage.setItem("tabela-" + data.tabela, JSON.stringify(lsOld));

  handleRenderLocalStorage();
}
