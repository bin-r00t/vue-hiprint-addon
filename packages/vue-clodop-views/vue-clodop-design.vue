<template>
  <div class="VueClodopDesignView">design</div>
</template>

<script>
export default {
  name: "VueClodopDesignView",
  components: {},
  props: {
    // 画布宽度
    width: {
      type: Number,
      default: 800,
    },
    // 画布高度
    height: {
      type: Number,
      default: 600,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped lang="scss">
.VueClodopDesignView {
}
</style>
