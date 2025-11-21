export const StorageActions = {
  clear: () => () => {
    localStorage.clear();
    sessionStorage.clear();
    console.log("🦖 Devosaurus: Storage limpiado.");
    window.location.reload();
  },

  logItem: (key: string) => () => {
    const val = localStorage.getItem(key) || sessionStorage.getItem(key);
    console.log(`🦖 Valor de ${key}:`, val);
    alert(`Valor: ${val}`);
  },
};
