export const ViewportActions = {
  scrollToBottom: () => () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  },

  scrollToTop: () => () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  scrollToElement: (selector: string) => () => {
    const el = document.querySelector(selector);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });

    if (el instanceof HTMLElement) {
      const original = el.style.border;
      el.style.border = "2px solid #e63946";
      setTimeout(() => (el.style.border = original), 2000);
    }
  },
};
