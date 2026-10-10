export default function handleForm() {
  const form = document.querySelector("#formCadastro");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    return data;
  });
}
