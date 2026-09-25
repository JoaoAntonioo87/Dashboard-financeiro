export default function handleDarkMode() {
  const btn = document.querySelector("#theme-btn");
  const btnIcon = document.querySelector("#theme-icon");
  const elements = Array.from(document.querySelectorAll("[data-theme]"));

  function handleIcon() {
    const currentIcon = btnIcon.getAttribute("src");
    if (currentIcon == "./img/icons/moon.svg") {
      btnIcon.setAttribute("src", "./img/icons/sun.svg");
    } else {
      btnIcon.setAttribute("src", "./img/icons/moon.svg");
    }
  }

  function toggleTheme() {
    elements.forEach((e) => {
      const currentTheme = e.getAttribute("data-theme");

      if (currentTheme == "light") {
        e.setAttribute("data-theme", "dark");
      } else {
        e.setAttribute("data-theme", "light");
      }
    });

    handleIcon();
  }

  btn.addEventListener("click", () => toggleTheme());
}
