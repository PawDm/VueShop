<template>
  <div class="v-cart">
    <h1>Cart</h1>
    <router-link :to="{ name: 'catalog' }">
      <div class="v-catalog__link_to_cart">Back to catalog</div>
    </router-link>
    <p v-if="!CART.length">There are no products in cart...</p>
    <v-cart-item
      v-for="(item, index) in CART"
      :key="item.article"
      :cart_item_data="item"
      @deleteFromCart="deleteFromCart(index)"
      @increment="increment(index)"
      @decrement="decrement(index)"
    />
    <div class="v-cart__total">
      <p class="total_name">Total:</p>
      <p>{{ cartTotalCost }} Р.</p>
    </div>
  </div>
</template>

<script>
import vCartItem from './v-cart-item.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'v-cart',
  components: {
    vCartItem,
  },
  data() {
    return {};
  },
  props: {},
  computed: {
    ...mapGetters(['CART']),
    cartTotalCost() {
      let result = [];
      return this.CART.reduce(
        (res, item) => res + item.price * item.quantity,
        0
      );
    },
  },
  methods: {
    ...mapActions([
      'DELETE_FROM_CART',
      'INCREMENT_CART_ITEM',
      'DECREMENT_CART_ITEM',
    ]),
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index);
    },
    increment(index) {
      this.INCREMENT_CART_ITEM(index);
    },
    decrement(index) {
      this.DECREMENT_CART_ITEM(index);
    },
  },
};
</script>

<style lang="scss">
.v-cart {
  margin-bottom: 100px;
  &__total {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    padding: $padding * 2 $padding * 3;
    display: flex;
    justify-content: center;
    background-color: $green-bg;
    color: #fff;
    font-size: 20px;
  }
  .total_name {
    margin-right: $margin * 2;
  }
}
</style>
