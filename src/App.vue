<template>
  <div id="app" style="display: flex; height: 90vh; flex-direction: column">
    <el-row>
      <el-button type="primary" @click="handlePreview">预览</el-button>
      <el-button type="warning" plain @click="handleDesign">设计</el-button>
      <el-button type="primary" plain @click="handlePrint">打印</el-button>
    </el-row>

    <el-row
      class="f-1"
      style="margin-top: 24px; height: 80%; background: #ccc3"
    >
      <DesignView v-if="mode == 'design'" />
      <PreviewView v-if="mode == 'preview'" />
    </el-row>
  </div>
</template>

<script>
import DesignView from "./DesignView.vue";
import PreviewView from "./PreviewView.vue";
export default {
  name: "App",
  components: { DesignView, PreviewView },
  data() {
    return {
      mode: null,
    };
  },
  methods: {
    handlePreview() {
      console.log("handlePreview");
      this.mode = "preview";
    },
    handleDesign() {
      console.log("handlePrint");
      this.mode = "design";
    },
    handlePrint() {
      console.log("handlePrint");
    },
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
