async function includeHTML(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

function loadComponents() {
  includeHTML("header", "header.html");
  includeHTML("navbar", "navbar.html");
  includeHTML("footer", "footer.html");
}

document.addEventListener("DOMContentLoaded", loadComponents);
