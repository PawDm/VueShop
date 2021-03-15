<template>
  <div class="v-select">
    <p class="title" @click="areOptionsVisible = !areOptionsVisible">
      {{ selected }}
    </p>
    <div class="options" v-if="areOptionsVisible || isExpended">
      <p
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
      >
        {{ option.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-select',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    selected: {
      type: String,
      default: '',
    },
    isExpended: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      areOptionsVisible: false,
    };
  },
  methods: {
    selectOption(option) {
      this.$emit('select', option);
      this.areOptionsVisible = false;
    },
    hideSelect() {
      this.areOptionsVisible = false;
    },
  },
  mounted() {
    document.addEventListener('click', this.hideSelect.bind(this), true);
  },
  unmounted() {
    document.removeEventListener('click', this.hideSelect);
  },
};
</script>

<style lang="scss">
.v-select {
  margin: 0 0 10px 20px;
  position: relative;
  width: 200px;
  .title {
    border: solid 1px #aeaeae;
    cursor: pointer;
  }
  p {
    margin: 0;
  }
  .options {
    border: solid 1px #aeaeae;
    background: #fff;
    position: absolute;
    top: 25px;
    right: 0;
    width: 100%;
    cursor: pointer;
    p:hover {
      background: #e7e7e7;
    }
  }
}
</style>
