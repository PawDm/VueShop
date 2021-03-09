import { createStore } from 'vuex';
import catalog from './modules/catalog';
import cart from './modules/cart';

export default createStore({
  modules: {
    catalog,
    cart,
  },
});
