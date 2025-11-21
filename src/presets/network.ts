export const NetworkActions = {
  // --- SECTION 1: TRIGGERS (Active Actions) ---

  ping: (url: string) => async () => {
    console.log(`🦖 Ping a: ${url}...`);
    try {
      const start = performance.now();
      const res = await fetch(url);
      const time = (performance.now() - start).toFixed(2);

      if (res.ok) {
        console.log(
          `%c ✅ PONG! (${time}ms) Status: ${res.status}`,
          "color: #4caf50; font-weight: bold"
        );
        alert(`API Online (${time}ms)`);
      } else {
        console.error(`❌ Error: ${res.status}`);
        alert(`API Error: ${res.status}`);
      }
    } catch (e) {
      console.error("❌ API Unreachable", e);
      alert("API inalcanzable (Posible CORS o Offline)");
    }
  },

  triggerPost:
    (url: string, body: object = {}) =>
    async () => {
      try {
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        console.log(`🦖 POST disparado a ${url}`);
      } catch (e) {
        console.error("🦖 Error disparando POST", e);
      }
    },

  // --- SECTION 2: SIMULATORS (Chaos Engineering) ---

  simulateOfflineMode: (enable: boolean) => () => {
    const win = window as any;
    if (enable) {
      if (!win._originalFetch) win._originalFetch = win.fetch;

      win.fetch = () =>
        Promise.reject(
          new TypeError("Failed to fetch (Devosaurus Simulation)")
        );
      console.log(
        "%c 🦖 MODO OFFLINE ACTIVADO ",
        "background: red; color: white; font-size: 14px"
      );
      alert("⚠️ Simulación: Red desconectada");
    } else {
      if (win._originalFetch) {
        win.fetch = win._originalFetch;
        delete win._originalFetch;
        console.log("%c 🦖 RED RESTAURADA ", "background: green; color: white");
        alert("✅ Simulación finalizada");
      }
    }
  },

  simulateSlowNetwork:
    (delayMs: number = 2000) =>
    () => {
      const win = window as any;

      if (!win._originalFetch) win._originalFetch = win.fetch;

      win.fetch = async (...args: any[]) => {
        console.log(`⏳ Devosaurus: Retrasando petición ${delayMs}ms...`);
        await new Promise((r) => setTimeout(r, delayMs));
        return win._originalFetch(...args);
      };

      alert(`🐢 Modo Red Lenta Activado (${delayMs}ms)`);
    },

  resetNetwork: () => () => {
    const win = window as any;
    if (win._originalFetch) {
      win.fetch = win._originalFetch;
      delete win._originalFetch;
      console.log("🦖 Configuración de red reseteada.");
    }
  },
};
