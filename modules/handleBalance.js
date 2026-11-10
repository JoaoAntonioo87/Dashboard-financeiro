export default function handleBalance() {
  const tableRevenue = JSON.parse(localStorage.getItem("tabela-receitas"));
  const tableExpense = JSON.parse(localStorage.getItem("tabela-despesas"));

  if (!tableExpense || !tableRevenue) {
    console.warn("There is a missing table in localStorage");
    return;
  }

  function getTotal(table) {
    let total = 0;
    for (let item in table) {
      if (table[item].valor) {
        total += Number(table[item].valor);
      }
    }

    if (!total) {
      console.warn("There is a error at some number from localStorage");
      return null;
    }

    return total;
  }

  const totalExpense = getTotal(tableExpense);
  const totalRevenue = getTotal(tableRevenue);
  const totalBalance = totalRevenue - totalExpense;

  const totalBalanceElement = document.querySelector("#totalBalance");
  if (totalBalance) {
    totalBalanceElement.innerText = totalBalance;
    totalBalanceElement.dataset.balance = totalBalance;
  } else {
    totalBalanceElement.innerText = 0;
    totalBalanceElement.dataset.balance = 0;
  }
}
