(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  const targets = document.querySelectorAll(
    ".feats li, .steps li, .visual, .download__panel, .strip p"
  );
  targets.forEach((el) => el.classList.add("reveal"));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );

  targets.forEach((el) => io.observe(el));
})();
