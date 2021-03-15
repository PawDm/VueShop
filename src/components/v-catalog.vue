<template>
  <div class="v-catalog">
    <router-link :to="{ name: 'cart' }">
      <div class="v-catalog__link_to_cart">Cart: {{ CART.length }}</div>
    </router-link>
    <h1>Catalog</h1>
    <div class="filters">
      <v-select
        :options="options"
        :selected="selected"
        @select="sortByCatigories"
        :isExpended="IS_MOBILE"
      />
      <div class="range-slider">
        <input
          type="range"
          min="0"
          max="10000"
          step="100"
          v-model.number="minPrice"
          @change="setRangeSliders"
        />
        <input
          type="range"
          min="0"
          max="10000"
          step="100"
          v-model.number="maxPrice"
          @change="setRangeSliders"
        />
      </div>
      <div class="range-values">
        <p>Min: {{ minPrice }}</p>
        <p>Max: {{ maxPrice }}</p>
      </div>
    </div>

    <div class="v-catalog__list">
      <v-catalog-item
        v-for="product in filtredProducts"
        :key="product.article"
        :product_data="product"
        @addToCart="addToCart"
      />
    </div>
  </div>
</template>

<script>
import vCatalogItem from './v-catalog-item.vue';
import vSelect from './v-select';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'v-catalog',
  components: {
    vCatalogItem,
    vSelect,
  },
  data() {
    return {
      cart_data: null,
      options: [
        { name: 'Все', value: 'all' },
        { name: 'Мужские', value: 'm' },
        { name: 'Женские', value: 'w' },
      ],
      selected: 'Все',
      sortedProducts: [],
      minPrice: 0,
      maxPrice: 10000,
    };
  },
  computed: {
    ...mapGetters(['PRODUCTS', 'CART', 'IS_MOBILE']),
    filtredProducts() {
      if (this.sortedProducts.length) {
        return this.sortedProducts;
      } else {
        return this.PRODUCTS;
      }
    },
  },
  methods: {
    ...mapActions(['GET_PRODUCTS_FROM_API', 'ADD_TO_CART']),
    addToCart(data) {
      this.ADD_TO_CART(data);
      console.log(this.CART); // проверка, добавляет ли в корзину
      this.cart_data = this.CART;
    },
    setRangeSliders() {
      if (this.minPrice > this.maxPrice) {
        let tmp = this.maxPrice;
        this.maxPrice = this.minPrice;
        this.minPrice = tmp;
      }
      this.sortByCatigories();
    },
    sortByCatigories(category) {
      let vm = this;
      this.sortedProducts = [...this.PRODUCTS];
      this.sortedProducts = this.sortedProducts.filter(function(item) {
        return item.price >= vm.minPrice && item.price <= vm.maxPrice;
      });
      if (category) {
        this.sortedProducts = this.sortedProducts.filter(function(item) {
          vm.selected = category.name;
          return item.category === category.name;
        });
      }
      // this.sortedProducts = [];
      // let vm = this;
      // this.PRODUCTS.map(function(item) {
      //   if (item.category === category.name) {
      //     vm.sortedProducts.push(item);
      //   }
      // });
      // this.selected = category.name;
    },
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API().then((response) => {
      if (response.data) {
        console.log('Data arived');
      }
    });
  },
};
</script>

<style lang="scss">
.v-catalog {
  .filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .range-slider {
    }
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }
  &__link_to_cart {
    position: fixed;
    top: 10px;
    right: 10px;
    padding: $padding * 2;
    border: solid 1px #aeaeae;
  }
  .range-slider input[type='range'] {
    position: absolute;
    // left: 65%;
    // top: 180px;
  }
  ::-webkit-slider-thumb {
    z-index: 2;
    position: relative;
    top: 2px;
    margin-top: -7px;
  }
  input[type='range'] {
    -webkit-appearance: none;
  }
  input[type='range']::-webkit-slider-runnable-track {
    width: 300px;
    height: 5px;
    background: #ddd;
    border: none;
    border-radius: 3px;
  }
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 1.5px solid #c1c1c1;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #ededed;
  }
  input[type='range']:focus {
    outline: none;
  }
  input[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    box-shadow: 1px 1px 1px #c6c6c6, 0px 0px 1px #787878;
    border-radius: 2px;
    border: 0.2px solid #787878;
  }
}
</style>
