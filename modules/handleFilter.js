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
      label.addEventListener("dblclick", (e) => {
        if (label.children[0].checked) {
          label.children[0].checked = false;
        }
      });
    });
  }

  handleInputs(formLabels);

  function checkMs(dateIndex) {
    const msDay = 24 * 60 * 60 * 1000;

    switch (dateIndex) {
      case "30-d":
        return msDay * 30;
      case "60-d":
        return msDay * 60;

      case "90-d":
        return msDay * 90;

      case "365-d":
        return msDay * 365;
    }
  }

  function renderTable(data, formTable) {
    const values = Object.values(data).filter((v) => v != "");
    const dates = ["30-d", "60-d", "90-d", "365-d"];
    const form = document.querySelector("#" + formTable);
    const filter = form.parentElement;
    const table = filter.parentElement;
    const bodyTable = table.lastElementChild;
    const allLine = [...bodyTable.children];

    allLine.forEach((line) => {
      line.style.display = "grid";

      values.forEach((value) => {
        if (dates.includes(value)) {
          const msValue = checkMs(value);
          const todayMs = Date.now();
          const children = [...line.children];
          const dateLine = new Date(
            children[0].innerText
              .split("/")
              .reverse()
              .toString()
              .replaceAll(",", "-"),
          );

          if (Date.parse(dateLine) < todayMs - msValue) {
            line.style.display = "none";
          }
        } else if (!Array(...line.children)[1].innerHTML.includes(value)) {
          line.style.display = "none";
        } else if (!line.innerText.includes(value)) {
          line.style.display = "none";
        }
      });
    });
  }

  function handleForm(formFilters) {
    formFilters.forEach((form) => {
      const formTable = form.id;
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        handleIcon(form.parentElement.children[0]);
        const dataForm = new FormData(form);
        const data = Object.fromEntries(dataForm);
        renderTable(data, formTable);
        form.classList.remove("active");
        return data;
      });
    });
  }

  handleForm(formFilters);
}
