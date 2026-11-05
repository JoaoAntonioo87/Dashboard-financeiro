import handleRenderLocalStorage from "./handleRenderLocalStorage.js";

export default function handleNewLineTable(data) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("linha-tabela");

  const arrayData = Object.entries(data);

  arrayData.forEach((item) => {
    if (item[0] === "data") {
      arrayData.unshift(item);
      arrayData.pop();
    } else if (item[0].includes("categoria")) {
      item[0] = String(item[0].split("-")[0]);
    }
  });

  const ordedData = Object.fromEntries(arrayData);

  for (let item in ordedData) {
    if (item === "data") {
      const date = ordedData[item].split("-").reverse().join("/");
      ordedData[item] = String(date);
      const newElement = document.createElement("p");
      newElement.classList.add(item);
      newElement.innerText = date;
      newDiv.prepend(newElement);
    } else if (item != "tabela") {
      const newElement = document.createElement("p");
      newElement.classList.add(item);

      if (Number(ordedData[item])) {
        newElement.innerText = Number(ordedData[item]);
        newDiv.appendChild(newElement);
      } else if (item.includes("categoria")) {
        item = String(item.split("-")[0]);
        newElement.innerText = item.charAt(0).toUpperCase() + item.slice(1);
        console.log(newElement.innerText);

        newDiv.appendChild(newElement);
      } else {
        newElement.innerText =
          ordedData[item].charAt(0).toUpperCase() + ordedData[item].slice(1);
        newDiv.appendChild(newElement);
      }
    }
  }

  const lsOld = JSON.parse(localStorage.getItem("tabela-" + data.tabela)) || {};
  const { tabela, ...dataSemTabela } = ordedData;
  lsOld[Object.keys(lsOld).length - 1] = dataSemTabela;

  localStorage.setItem("tabela-" + ordedData.tabela, JSON.stringify(lsOld));

  handleRenderLocalStorage();
}
