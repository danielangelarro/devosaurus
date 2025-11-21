export const NavActions = {
  goTo: (url: string) => () => {
    window.location.href = url;
  },

  reload: () => () => {
    window.location.reload();
  },

  goBack: () => () => {
    window.history.back();
  },
};
