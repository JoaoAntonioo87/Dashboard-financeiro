import getLocalStorageData from "./getLocalStorageData.js";

let graphicExpenses = null;
let graphicRevenues = null;

export default function handleGraphics() {
  const chartExpenses = document.getElementById("chartExpenses");
  const chartRevenues = document.getElementById("chartRevenues");

  if (!chartExpenses || !chartRevenues) {
    console.warn("Error: Missing canva!");
    return;
  }

  function getData(localStorageData) {
    const dates = [];
    const values = [];
    for (let i in localStorageData) {
      if (localStorageData[i].data) {
        dates.push(localStorageData[i].data);
      }
      if (localStorageData[i].valor) {
        values.push(localStorageData[i].valor);
      }
    }
    return { dates, values };
  }

  const expenses = getLocalStorageData("tabela-despesas");
  const revenues = getLocalStorageData("tabela-receitas");

  const dataExpenses = getData(expenses);
  const dataRevenues = getData(revenues);

  // SE JÁ EXISTIR UM GRÁFICO CRIADO, DESTRUA-O ANTES DE CRIAR OUTRO
  if (graphicExpenses) {
    graphicExpenses.destroy();
  }
  if (graphicRevenues) {
    graphicRevenues.destroy();
  }

  // Criação dos gráficos
  graphicExpenses = new Chart(chartExpenses, {
    type: "bar",
    data: {
      labels: dataExpenses.dates,
      datasets: [
        {
          label: "Total de despesa por dia",
          data: dataExpenses.values,
          borderWidth: 2,
          backgroundColor: "#fb6161",
        },
      ],
    },
    options: {
      scales: { y: { beginAtZero: true } },
    },
  });

  graphicRevenues = new Chart(chartRevenues, {
    type: "bar",
    data: {
      labels: dataRevenues.dates,
      datasets: [
        {
          label: "Total de renda por dia",
          data: dataRevenues.values,
          borderWidth: 2,
          backgroundColor: "#4deb77",
        },
      ],
    },
    options: {
      scales: { y: { beginAtZero: true } },
    },
  });

  function updateCharts() {
    const newExpenses = getLocalStorageData("tabela-despesas");
    const newRevenues = getLocalStorageData("tabela-receitas");

    const updatedDataExpenses = getData(newExpenses);
    const updatedDataRevenues = getData(newRevenues);

    graphicExpenses.data.labels = updatedDataExpenses.dates;
    graphicExpenses.data.datasets[0].data = updatedDataExpenses.values;
    graphicExpenses.update();

    graphicRevenues.data.labels = updatedDataRevenues.dates;
    graphicRevenues.data.datasets[0].data = updatedDataRevenues.values;
    graphicRevenues.update();
  }

  return { updateCharts };
}
