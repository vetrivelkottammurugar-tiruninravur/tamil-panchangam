let current = new Date();

function renderCalendar() {
  const year = current.getFullYear();
  const month = current.getMonth();

  document.getElementById("monthTitle").innerText =
    current.toLocaleDateString("ta-IN", { month: "long", year: "numeric" });

  const firstDay = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();

  const tbody = document.querySelector("#calendar tbody");
  tbody.innerHTML = "";

  let row = document.createElement("tr");

  for (let i = 0; i < firstDay; i++) {
    row.appendChild(document.createElement("td"));
  }

  for (let d = 1; d <= days; d++) {
    const td = document.createElement("td");
    td.innerHTML = `<a href="daily.html?d=${d}&m=${month+1}&y=${year}">${d}</a>`;
    row.appendChild(td);

    if ((firstDay + d) % 7 === 0 || d === days) {
      tbody.appendChild(row);
      row = document.createElement("tr");
    }
  }
}

function prevMonth() {
  current.setMonth(current.getMonth() - 1);
  renderCalendar();
}

function nextMonth() {
  current.setMonth(current.getMonth() + 1);
  renderCalendar();
}

function goToday() {
  current = new Date();
  renderCalendar();
}

renderCalendar();
