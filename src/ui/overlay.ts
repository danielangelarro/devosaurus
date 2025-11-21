import { styles } from "./styles";

export class Overlay {
  private readonly root: HTMLElement;
  private readonly badge: HTMLElement;
  private readonly statusText: HTMLElement;

  constructor(onToggle: () => void) {
    this.root = document.createElement("div");
    this.root.id = "devosaurus-root";

    const styleTag = document.createElement("style");
    styleTag.textContent = styles;
    document.head.appendChild(styleTag);

    this.root.innerHTML = `
      <div class="devo-badge" id="devo-trigger">
        <span>🦖</span>
        <span class="devo-status">Inactivo</span>
      </div>
    `;

    document.body.appendChild(this.root);

    this.badge = this.root.querySelector(".devo-badge") as HTMLElement;
    this.statusText = this.root.querySelector(".devo-status") as HTMLElement;

    this.badge.addEventListener("click", onToggle);
  }

  setListening(isListening: boolean) {
    if (isListening) {
      this.badge.classList.add("listening");
      this.statusText.textContent = "Escuchando...";
    } else {
      this.badge.classList.remove("listening");
      this.statusText.textContent = "Click para Hablar";
    }
  }

  showFeedback(text: string) {
    const prevText = this.statusText.textContent;
    this.statusText.textContent = text;
    setTimeout(() => {
      if (!this.badge.classList.contains("listening")) {
        this.statusText.textContent = "Click para Hablar";
      }
    }, 2000);
  }
}
