export default function handleChoiceTable() {
  const table = document.querySelector("#tabela");
  table.addEventListener("change", (e) => {
    const typeChoice = e.target.value;
    const selectChoice = document.querySelector("#categoria-" + typeChoice);

    selectChoice.style.display = "grid";
    selectChoice.required = true;

    let notSelectChoice;

    typeChoice === "receitas"
      ? (notSelectChoice = document.querySelector("#categoria-despesas"))
      : (notSelectChoice = document.querySelector("#categoria-receitas"));

    notSelectChoice.style.display = "none";
    notSelectChoice.setAttribute("required", false);
  });
}
