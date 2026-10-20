export default function handleRenderLocalStorage() {
  function renderTable(formName) {
    const tableLS = localStorage.getItem(formName);
    const allLinesLS = JSON.parse(tableLS);
    const localStorageObj = Object.values(Object.values(allLinesLS)).reverse();

    const tableHTML = document.querySelector("#" + localStorageObj[0]);
    const linesHTML = [...tableHTML.children];

    const tables = Array.isArray(localStorageObj)
      ? localStorageObj
      : [localStorageObj];

    for (let line of linesHTML) {
      let matchFound = false;

      for (let table of tables) {
        if (typeof table !== "string" && table !== null) {
          const tableText = Object.values(table).join("");
          const lineText = line.innerText
            .replaceAll("\n", " ")
            .split("  ")
            .join("");

          if (lineText === tableText) {
            matchFound = true;
            break;
          }
        }
      }

      line.style.display = matchFound ? "grid" : "none";
    }

    for (let table of tables) {
      if (typeof table !== "string" && table !== null) {
        const tableText = Object.values(table).join("");
        let existsInDOM = false;

        for (let line of linesHTML) {
          const lineText = line.innerText
            .replaceAll("\n", " ")
            .split("  ")
            .join("");
          if (lineText === tableText) {
            existsInDOM = true;
            break;
          }
        }

        if (!existsInDOM) {
          const containerPai = document.getElementById(tables[0]);
          const newDiv = document.createElement("div");
          newDiv.style.display = "grid";
          let tableId = "";

          for (let item in table) {
            if (item == "data") {
              const date = table[item].split("-").reverse().join("/");
              const newElement = document.createElement("p");
              newElement.classList.add(item);
              newElement.innerText = date;
              newDiv.prepend(newElement);
            } else if (item != "tabela") {
              const newElement = document.createElement("p");
              newElement.classList.add(item);

              if (!isNaN(table[item]) && table[item] !== "") {
                newElement.innerText = table[item];
              } else {
                const valorStr = String(table[item]);
                newElement.innerText =
                  valorStr.charAt(0).toUpperCase() + valorStr.slice(1);
              }

              newDiv.appendChild(newElement);
            } else {
              tableId = "tabela-" + table[item];
              newDiv.id = tableId;
            }
            newDiv.classList.add("linha-tabela");
          }
          containerPai.appendChild(newDiv);
        }
      }
    }
  }

  const lSItens = { ...localStorage };
  for (let i = 0; i < Object.entries(lSItens).length; i++) {
    const lSKey = Object.entries(lSItens)[i][0];
    const lSValue = JSON.parse(localStorage.getItem(lSKey));
    const formName = "tabela-" + lSKey.split("-")[1];

    renderTable(formName, lSValue);
  }
}
