import axios from 'axios';
export default {
  state: {
    cart: [],
  },
  mutations: {
    INCREMENT: (state, index) => {
      state.cart[index].quantity++;
    },
    DECREMENT: (state, index) => {
      if (state.cart[index].quantity > 1) {
        state.cart[index].quantity--;
      }
    },
    SET_CART: (state, product) => {
      let isProductExist = false;
      state.cart.map(function(item) {
        if (item.article === product.article) {
          isProductExist = true;
          item.quantity++;
        }
      });
      if (!isProductExist) {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    REMOVE_FROM_CART: (state, index) => {
      state.cart.splice(index, 1);
    },
  },
  actions: {
    ADD_TO_CART({ commit }, product) {
      commit('SET_CART', product);
    },
    INCREMENT_CART_ITEM({ commit }, index) {
      commit('INCREMENT', index);
    },
    DECREMENT_CART_ITEM({ commit }, index) {
      commit('DECREMENT', index);
    },
    DELETE_FROM_CART({ commit }, index) {
      commit('REMOVE_FROM_CART', index);
    },
  },
  getters: {
    CART(state) {
      return state.cart;
    },
  },
};
