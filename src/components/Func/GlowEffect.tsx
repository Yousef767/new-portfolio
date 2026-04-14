export const GlowEffect = (): void => {
  const cards = document.querySelectorAll<HTMLElement>(".card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);

      card.classList.remove("fade-out");
      card.classList.add("fade-in");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.add("fade-in");
      card.classList.add("fade-out");
    });
  });
};