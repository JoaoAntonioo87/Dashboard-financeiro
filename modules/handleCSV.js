export default function handleCSV() {
  function getLocalStorageData(key) {
    const data = localStorage.getItem(key);

    if (data === null) {
      console.warn(`Missing localStorage key: ${key}`);
      return null;
    }

    try {
      const parsedData = JSON.parse(data);

      if (parsedData === null || typeof parsedData !== "object") {
        console.warn(`Invalid data structure: ${key}`);
        return null;
      }

      return Object.values(parsedData);
    } catch (error) {
      console.warn(`Invalid JSON in ${key}`, error);
      return null;
    }
  }

  function handleDataRetrieval() {
    const expenses = getLocalStorageData("tabela-despesas");
    const revenues = getLocalStorageData("tabela-receitas");

    if (
      typeof expenses === "undefined" ||
      expenses === null ||
      typeof revenues === "undefined" ||
      revenues === null
    ) {
      console.warn("Error: localStorage item is missing or not an object");
      return;
    }

    const lsItems = [expenses, revenues]
      .flat()
      .filter((item) => typeof item !== "string");

    if (lsItems.length === 0) {
      console.warn("Error: localStorage item is missing or not an object");
      return;
    }
    return lsItems;
  }

  const arrayItems = handleDataRetrieval();

  function createCSV(transactions) {
    let csvContent = "data:text/csv;charset=utf-8,";

    transactions.forEach((obj, index) => {
      if (index === 0) {
        const header = Object.keys(obj).join(",");
        csvContent += header + "\r\n";
      }
      const row = Object.values(obj).join(",");
      csvContent += row + "\r\n";
    });
    return csvContent;
  }

  if (arrayItems.length === 0 || !arrayItems) {
    console.warn(
      "Error: arrayItems is not a valid value. Please check functinon handleDataRetrieval",
    );
  }

  const csv = createCSV(arrayItems);

  function handleDOM(csv) {
    const btn = document.querySelector("#btn-csv");

    if (!btn) {
      console.warn("Error: button to export csv is not found");
      return;
    }
    btn.addEventListener("click", () => {
      const encodedUri = encodeURI(csv);
      window.open(encodedUri);
    });
  }

  handleDOM(csv);
}
