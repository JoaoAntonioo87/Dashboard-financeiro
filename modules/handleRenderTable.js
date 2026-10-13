export default function handleRenderTable(data, formTable) {
  if (data && formTable) {
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
        } else if (
          Number(value) &&
          !line.children[1].innerHTML.includes(value)
        ) {
          line.style.display = "none";
        } else if (!line.innerText.includes(value)) {
          line.style.display = "none";
        }
      });
    });
  }
}
