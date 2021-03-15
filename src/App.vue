<template>
  <v-main-wrapper></v-main-wrapper>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import vMainWrapper from './components/v-main-wrapper.vue';
export default {
  name: 'App',
  components: {
    vMainWrapper,
  },
  computed: {
    ...mapGetters(['IS_MOBILE', 'IS_DESKTOP']),
  },
  methods: {
    ...mapActions(['SET_MOBILE', 'SET_DESKTOP']),
  },
  mounted() {
    let vm = this;
    window.addEventListener('resize', function() {
      if (window.innerWidth > 767) {
        vm.SET_DESKTOP();
        console.log(vm.IS_DESKTOP);
      } else {
        vm.SET_MOBILE();
        console.log(vm.IS_MOBILE);
      }
    });
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
