async function includeHTML(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

function initNav() {
  const current = location.pathname.split("/").pop();

  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("href") === current) {
      link.classList.add(
  "text-primary",
  "font-bold",
  "border-b-2",
  "border-primary",
  "pb-1",
  "font-label-md",
  "text-label-md",
  "transition-colors"
);
    }
  });
}

async function loadComponents() {
  await Promise.all([
    includeHTML("navbar", "navbar.html"),
    includeHTML("footer", "footer.html")
  ]);

  initNav(); // ✔ RUN AFTER LOAD CONFIRMED
}

document.addEventListener("DOMContentLoaded", loadComponents);
