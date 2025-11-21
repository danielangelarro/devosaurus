export const DomActions = {
  click: (selector: string) => () => {
    const el = document.querySelector(selector) as HTMLElement;
    if (el) {
      el.click();
      console.log(`🦖 Devosaurus: Click en '${selector}'`);
    } else {
      console.warn(`🦖 Devosaurus: Elemento '${selector}' no encontrado.`);
    }
  },

  focus: (selector: string) => () => {
    const el = document.querySelector(selector) as HTMLElement;
    el?.focus();
  },

  type: (selector: string, text: string) => () => {
    const el = document.querySelector(selector) as HTMLInputElement;
    if (el) {
      el.value = text;

      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    }
  },

  toggleBodyClass: (className: string) => () => {
    document.body.classList.toggle(className);
  },

  debugLayout:
    (color: string = "red") =>
    () => {
      const id = "devo-debug-style";
      const existing = document.getElementById(id);
      if (existing) {
        existing.remove();
      } else {
        const style = document.createElement("style");
        style.id = id;
        style.innerHTML = `* { outline: 1px solid ${color} !important; }`;
        document.head.appendChild(style);
      }
    },
};
