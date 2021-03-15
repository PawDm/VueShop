import axios from 'axios';
export default {
  state: {
    products: [],
    isMobile: false,
    isDesktop: true,
  },
  mutations: {
    SET_PRODUCTS_TO_STATE: (state, products) => {
      state.products = products;
    },
    SWITCH_MOBILE: (state) => {
      state.isMobile = true;
      state.isDesktop = false;
    },
    SWITCH_DESKTOP: (state) => {
      state.isDesktop = true;
      state.isMobile = false;
    },
  },
  actions: {
    GET_PRODUCTS_FROM_API({ commit }) {
      return axios('http://localhost:3000/products', { method: 'GET' })
        .then((products) => {
          commit('SET_PRODUCTS_TO_STATE', products.data);
          return products;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
    SET_MOBILE({ commit }) {
      commit('SWITCH_MOBILE');
    },
    SET_DESKTOP({ commit }) {
      commit('SWITCH_DESKTOP');
    },
  },
  modules: {},
  getters: {
    PRODUCTS(state) {
      return state.products;
    },
    IS_MOBILE(state) {
      return state.isMobile;
    },
    IS_DESKTOP(state) {
      return state.isDesktop;
    },
  },
};
