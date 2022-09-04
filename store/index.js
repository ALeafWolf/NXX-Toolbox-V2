export const state = () => ({
  mobileMenu: false,
});

export const getters = {
  getMobileMenu(state) {
    return state.mobileMenu;
  },
};

export const mutations = {
  toggleMobileMenu(state) {
    state.mobileMenu = !state.mobileMenu;
  },
  closeMobileMenu(state) {
    state.mobileMenu = false;
  },
};

export const actions = {};
