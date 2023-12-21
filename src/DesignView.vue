<!-- 
    filename: DesignView.vue
    author: liubin
    date: 2023-12-21 13:31:31
    description: 
-->

<template>
  <div class="DesignView">
    <VueClodopDesignView />
  </div>
</template>

<script>
export default {
  name: "DesignView",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped lang="scss">
.DesignView {
  padding: 20px;
  background: #fff;
  border: 1px solid #ccc;
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
