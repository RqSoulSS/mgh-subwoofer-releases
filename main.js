(() => {
  const months = [
    "янв", "фев", "мар", "апр", "мая", "июн",
    "июл", "авг", "сен", "окт", "ноя", "дек"
  ];

  function formatDate(iso) {
    const m = String(iso || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return iso || "";
    const day = String(+m[3]);
    const mon = months[+m[2] - 1] || m[2];
    return day + " " + mon + " " + m[1];
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderChangelog(entries) {
    const host = document.getElementById("changelog-list");
    if (!host || !Array.isArray(entries) || !entries.length) return;
    host.innerHTML = entries.map((e) => {
      const ver = escapeHtml(e.version || "");
      const title = escapeHtml(e.title || "");
      const date = escapeHtml(e.date || "");
      const items = (e.changes || []).map((c) => "<li>" + escapeHtml(c) + "</li>").join("");
      return (
        '<article class="log__item" data-version="' + ver + '">' +
          "<header>" +
            "<b>v" + ver + "</b>" +
            (date ? '<time datetime="' + date + '">' + formatDate(date) + "</time>" : "") +
            (title ? "<span>" + title + "</span>" : "") +
          "</header>" +
          "<ul>" + items + "</ul>" +
        "</article>"
      );
    }).join("");
  }

  fetch("changelog.json?v=" + Date.now())
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then(renderChangelog)
    .catch(() => {})
    .finally(setupReveal);

  function setupReveal() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nodes = document.querySelectorAll(
      ".how__list article, .path li, .get__box, .rail > div, .log__item, .tg__box"
    );
    nodes.forEach((el) => el.classList.add("reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" }
    );
    nodes.forEach((el) => io.observe(el));
  }
})();
