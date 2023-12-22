<template>
  <div id="app" style="display: flex; height: 100vh; flex-direction: column">
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
        background: #36907a
      "
    >
      <el-button type="primary" @click="handlePreview">预览</el-button>
      <el-button type="warning" plain @click="handleDesign">设计</el-button>
      <el-button type="primary" plain @click="handlePrint">打印</el-button>
    </div>

    <el-row style="flex: 1; height: 80%; background: #ccc">
      <HiPrintPage :mode="mode" />
      <!-- <DesignView v-if="mode == 'design'" />
      <PreviewView v-if="mode == 'preview'" /> -->
    </el-row>
  </div>
</template>

<script>
import HiPrintPage from "./components/HiPrintModule";
import DesignView from "./DesignView.vue";
import PreviewView from "./PreviewView.vue";

import bus from './components/HiPrintModule/bus'
export default {
  name: "App",
  components: { DesignView, PreviewView, HiPrintPage },
  data() {
    return {
      mode: null,
    };
  },
  methods: {
    handlePreview() {
      console.log("handlePreview");
      // this.mode = "preview";
      bus.$emit('preview')
    },
    handleDesign() {
      console.log("handlePrint");
      this.mode = "design";
    },
    handlePrint() {
      console.log("handlePrint");
      bus.$emit('print');
    },
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
