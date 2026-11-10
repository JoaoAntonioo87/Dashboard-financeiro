export default function handleDarkMode() {
  const btn = document.querySelector("#theme-btn");
  const btnIcon = document.querySelector("#theme-icon");
  const elements = Array.from(document.querySelectorAll("[data-theme]"));

  if (!btn) {
    console.warn('There is no element with "#theme-btn" to select');
    return;
  }

  function handleIcon() {
    if (btnIcon) {
      const currentIcon = btnIcon.getAttribute("src");
      currentIcon === "./img/icons/moon.svg"
        ? btnIcon.setAttribute("src", "./img/icons/sun.svg")
        : btnIcon.setAttribute("src", "./img/icons/moon.svg");
    } else {
      console.warn('There is no element with "#theme-icon" to select');
    }
  }

  function toggleTheme() {
    if (elements.length > 0) {
      const currentTheme = elements[0].getAttribute("data-theme");
      const nextTheme = currentTheme === "light" ? "dark" : "light";
      elements.forEach((e) => {
        e.setAttribute("data-theme", nextTheme);
      });
      handleIcon();
    } else {
      console.warn('There is no element with "[data-theme]" to select');
    }
  }

  btn.addEventListener("click", () => toggleTheme());
}
