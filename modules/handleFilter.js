import handleRenderTable from "./handleRenderTable.js";

export default function handleFilter() {
  const btns = Array.from(document.querySelectorAll(".btn-filtro"));

  const formLabels = Array.from(document.querySelectorAll(".formFiltro label"));

  const formFilters = Array.from(document.querySelectorAll(".formFiltro"));

  function handleIcon(btn) {
    const children = [...btn.children];
    children.forEach((child) => {
      if (child.getAttribute("src") == "./img/icons/full-funnel.svg") {
        child.setAttribute("src", "./img/icons/empty-funnel.svg");
      } else {
        child.setAttribute("src", "./img/icons/full-funnel.svg");
      }
    });
  }

  function toggleFilter(btn) {
    handleIcon(btn);
    const form = btn.nextElementSibling;
    form.classList.toggle("active");
  }

  function handleBtn(btns) {
    btns.forEach((btn) => {
      btn.addEventListener("click", () => toggleFilter(btn));
    });
  }

  handleBtn(btns);

  function handleInputs(labels) {
    labels.forEach((label) => {
      label.addEventListener("click", (e) => {
        e.preventDefault();
        if (label.children[0].checked) {
          label.children[0].checked = false;
        } else {
          label.children[0].checked = true;
        }
      });
    });
  }

  handleInputs(formLabels);

  function handleFormFilter(formFilters) {
    formFilters.forEach((form) => {
      const formTable = form.id;
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        handleIcon(form.parentElement.children[0]);
        const dataForm = new FormData(form);
        const data = Object.fromEntries(dataForm);
        handleRenderTable(data, formTable);
        form.classList.remove("active");
        return data;
      });
    });
  }

  handleFormFilter(formFilters);
}
