import getLocalStorageData from "./getLocalStorageData.js";

export default function handleGraphics() {
  const chartExpenses = document.getElementById("chartExpenses");
  const chartRevenues = document.getElementById("chartRevenues");

  const revenues = getLocalStorageData("tabela-despesas");
  const expenses = getLocalStorageData("tabela-receitas");

  function getData(localStorage) {
    const dataGraphics = {};
    const dates = [];
    const values = [];
    for (let i in localStorage) {
      if (localStorage[i].data) {
        dates.push(localStorage[i].data);
      }
      if (localStorage[i].valor) {
        values.push(localStorage[i].valor);
      }
    }

    dataGraphics.dates = dates;
    dataGraphics.values = values;

    return dataGraphics;
  }

  const dataExpenses = getData(expenses);
  const dataRevenues = getData(revenues);

  const graphicExpenses = new Chart(chartExpenses, {
    type: "bar",
    data: {
      labels: dataExpenses.dates,
      datasets: [
        {
          label: "Total de renda por dia",
          data: dataExpenses.values,
          borderWidth: 2,
          backgroundColor: "#4deb77",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  const graphicRevenues = new Chart(chartRevenues, {
    type: "bar",
    data: {
      labels: dataRevenues.dates,
      datasets: [
        {
          label: "Total de despesa por dia",
          data: dataRevenues.values,
          borderWidth: 2,
          backgroundColor: "#fb6161",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
