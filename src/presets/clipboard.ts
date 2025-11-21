export const ClipboardActions = {
  copyTextFrom: (selector: string) => () => {
    const el = document.querySelector(selector) as HTMLElement;
    const text = el?.innerText || (el as HTMLInputElement)?.value || '';
    
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        console.log('🦖 Copiado al portapapeles:', text);
      });
    }
  },

  copyUrl: () => () => {
    navigator.clipboard.writeText(window.location.href);
  },
  
  copyStorageKey: (key: string) => () => {
     const val = localStorage.getItem(key) || '';
     navigator.clipboard.writeText(val);
     alert(`Copiado: ${key}`);
  }
};