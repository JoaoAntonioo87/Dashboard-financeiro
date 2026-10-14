import handleNewLineTable from "./handleNewLineTable.js";

export default function handleFormRegister() {
  const form = document.querySelector("#formCadastro");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    handleNewLineTable(data);

    form.reset();
    return;
  });
}
