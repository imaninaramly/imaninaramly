async function includeHTML(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

function initNav() {
  const current = location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-link").forEach(link => {
    const href = link.getAttribute("href");

    if (href === current) {
      link.classList.add(
        "bg-purple-100",
        "text-purple-800",
        "font-semibold"
      );
    }
  });
}

async function loadComponents() {
  await includeHTML("navbar", "navbar.html");
  await includeHTML("footer", "footer.html");

  // 🔥 delay kecil WAJIB sebab DOM injection
  setTimeout(initNav, 50);
}

document.addEventListener("DOMContentLoaded", loadComponents);
