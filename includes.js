async function includeHTML(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

function initNav() {
  const current = location.pathname.split("/").pop();

  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("href") === current) {
      link.classList.add("bg-purple-100", "text-purple-800", "font-semibold");
    }
  });
}

async function loadComponents() {
  await Promise.all([
    includeHTML("navbar", "navbar.html"),
    includeHTML("footer", "footer.html")
  ]);

  initNav(); // run after all loaded
}

document.addEventListener("DOMContentLoaded", loadComponents);
