<!-- 
    filename: MainPanel.vue
    author: liubin
    date: 2023-12-22 09:34:11
    description: 
-->

<template>
  <div class="flex-col hi-print-module-main-panel">
    <section class="main-panel-area">
      <div id="hiprint-template-area"></div>
    </section>
    <section class="nested-opration-area">
      <div class="tool scale-tool">
        <div class="tool-inner">
          <span>缩放比例</span>
          <el-slider
            v-model="tools.scale"
            @input="handleScaleChange"
          ></el-slider>
        </div>
      </div>
      <div class="tool preview-tool">
        <div class="tool-inner">
          <el-button size="small" type="text" @click="handlePreview"
            >预览</el-button
          >
        </div>
      </div>
      <div class="tool export-tool">
        <div class="tool-inner">
          <el-button size="small" type="text" @click="handleExport(null, null)"
            >导出pdf</el-button
          >
        </div>
      </div>
      <div class="tool print-tool">
        <div class="tool-inner">
          <el-button size="small" type="text" @click="handlePrint"
            >打印</el-button
          >
        </div>
      </div>
      <div class="tool clean-tool">
        <div class="tool-inner">
          <el-button size="small" type="danger" @click="handleClean"
            >清空画布</el-button
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import bus from "../bus";
import jsondata from "./test.data.json";

export default {
  name: "HiPrintModuleMainPanel",
  components: {},
  props: {},
  data() {
    return {
      tools: {
        scale: 100,
      },
    };
  },
  inject: ["hiprint"],
  computed: {},
  mounted() {
    $("#hiprint-template-area").empty();
    const template = new hiprint.PrintTemplate({
      settingContainer: "#hiprint-options-area", // 在 right panel 定义
    });
    template.design("#hiprint-template-area");
    // test loading json data
    template.update(jsondata);
    // 保存这个 template
    bus.$emit("template", template);
  },
  methods: {
    handleScaleChange(size) {
      bus.$emit("scale", size);
    },
    handleExport(name, type = "") {
      bus.$emit("pdf", { name, type });
    },
    handlePreview() {
      bus.$emit("preview");
    },
    handlePrint() {
      bus.$emit("print");
    },
    handleClean() {
      try {
        this.$confirm("确认清空画布？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then((res) => {
            bus.$emit("clean");
          })
          .catch(() => {});
      } catch (error) {
        this.$message.error(`操作失败: ${error}`);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.hi-print-module-main-panel {
  height: 100%;
  background: #fff;
}

.main-panel-area {
  flex: 1;
  padding: 24px;
  overflow-y: scroll;
  overflow-x: scroll;
  position: relative;
}

#hiprint-template-area {
  position: absolute;
  top: 20px;
  left: 20px;
  // width: calc(100% - 20px);
  // height: calc(100% - 20px);
  // overflow: scroll;
}

.nested-opration-area {
  padding: 0 12px;
  border-top: 1px solid #ccc;
}

.tool {
  display: inline-block;
  align-items: center;
  gap: 8px;
  font-size: 12px;

  &:not(:last-child) {
    margin-right: 18px;
  }
}

.scale-tool {
  width: 100px;
}

.tool-inner {
  display: flex;
  align-items: center;
  gap: 10px;
}

:deep(.tool-inner) {
  .el-slider {
    flex: 1;
  }
}
</style>
