<template>
  <div class="v-cart-item">
    <img
      class="v-cart-item__img"
      :src="require('../assets/images/' + cart_item_data.image)"
      alt="img"
    />
    <div class="v-cart-item__info">
      <p>{{ cart_item_data.name }}</p>
      <p>{{ cart_item_data.price }} Р.</p>
      <p>{{ cart_item_data.article }}</p>
    </div>

    <div class="v-cart-item__qantity">
      <p>Qty:</p>
      <span>
        <span class="quantity_btn" @click="decrementItem()">-</span>
        {{ cart_item_data.quantity }}
        <span class="quantity_btn" @click="incrementItem">+</span>
      </span>
    </div>
    <button @click="deleteFromCart">Delete</button>
  </div>
</template>

<script>
export default {
  name: 'v-cart-item',
  props: {
    cart_item_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    deleteFromCart() {
      this.$emit('deleteFromCart');
    },
    decrementItem() {
      this.$emit('decrement');
    },
    incrementItem() {
      this.$emit('increment');
    },
  },
};
</script>

<style lang="scss">
.v-cart-item {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 8px 0 #e8e0e0;
  padding: $padding * 2;
  margin-bottom: $margin * 2;
  &__img {
    max-width: 50px;
  }
  .quantity_btn {
    cursor: pointer;
  }
}
</style>
