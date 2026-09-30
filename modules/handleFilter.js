export default function handleFilter() {
  const btns = Array.from(document.querySelectorAll(".btn-filtro"));

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

  btns.forEach((btn) => {
    btn.addEventListener("click", () => toggleFilter(btn));
  });
}
