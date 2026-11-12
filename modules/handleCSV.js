export default function handleCSV() {
  const lsItems = [
    Object.values(JSON.parse(localStorage.getItem("tabela-despesas"))),
    Object.values(JSON.parse(localStorage.getItem("tabela-receitas"))),
  ]
    .flat()
    .filter((item) => typeof item != "string");

  let csvContent = "data:text/csv;charset=utf-8,";

  if (!lsItems || lsItems.length === 0) {
    console.warn("Error: localStorage item is missing or not an object");
    return;
  }

  lsItems.forEach((obj) => {
    let row = Object.values(obj).join(",");
    csvContent += row + "\r\n";
  });

  const btn = document.querySelector("#btn-csv");

  if (!btn) {
    console.warn("Error: button to export csv is not find");
  }

  btn.addEventListener("click", (e) => {
    const encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  });
}
