(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const nodes = document.querySelectorAll(
    ".how__list article, .path li, .get__box, .rail > div"
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
})();
