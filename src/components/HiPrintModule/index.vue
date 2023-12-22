<!-- 
    filename: index.vue
    author: liubin
    date: 2023-12-22 09:31:41
    description: 
-->

<template>
  <div class="hi-print-module-entry">
    <div v-if="mode == 'design'" class="flex-row design-view">
      <LeftPanel class="" style="flex: 1" />
      <MainPanel class="" style="flex: 2" />
      <RightPanel class="" style="flex: 1" />
    </div>
  </div>
</template>

<script>
import "./index.css";
import { hiprint, defaultElementTypeProvider } from "vue-plugin-hiprint";
import LeftPanel from "./components/LeftPanel.vue";
import MainPanel from "./components/MainPanel.vue";
import RightPanel from "./components/RightPanel.vue";

hiprint.init({
  providers: [new defaultElementTypeProvider()],
});

export default {
  name: "HiPrintModuleEntry",
  components: { LeftPanel, MainPanel, RightPanel },
  props: {
    mode: {
      type: String,
      default: "design", // | 'preview'
    },
  },
  data() {
    return {};
  },
  provide() {
    return {
      hiprint() {
        return hiprint;
      },
      getHiprint() {
        return hiprint;
      },
    };
  },
  mounted() {},
  computed: {},
  methods: {},
};
</script>

<style scoped lang="scss">
.hi-print-module-entry {
  height: 100%;

  .design-view {
    height: 100%;
  }
}
</style>
