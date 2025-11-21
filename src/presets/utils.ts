export const UtilActions = {
  wait: (ms: number) => () => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  hardReload: () => () => {
    window.location.reload();
  },
};
