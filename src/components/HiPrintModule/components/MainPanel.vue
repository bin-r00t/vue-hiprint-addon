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
          <el-slider v-model="tools.scale"></el-slider>
        </div>
      </div>
      <div class="tool preview-tool">
        <div class="tool-inner">
          <el-button size="small" type="text" @click="">预览</el-button>
        </div>
      </div>
      <div class="tool export-tool">
        <div class="tool-inner">
          <el-button size="small" type="text" @click="">导出pdf</el-button>
        </div>
      </div>
      <div class="tool print-tool">
        <div class="tool-inner">
          <el-button size="small" type="text" @click="">打印</el-button>
        </div>
      </div>
      <div class="tool clean-tool">
        <div class="tool-inner">
          <el-button size="small" type="danger" @click="">清空画布</el-button>
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

    // events
    bus.$on("print", function () {
      console.log("[MainPanel] printing....");

      let printData = { name: "Test Print" };
      let options = { leftOffset: -1, topOffset: -1 };
      let ext = {
        callback: () => {
          console.log("浏览器窗口已打开");
        },
        styleHandler: () => {
          return `<style>.hiprint-printElement-text{color:red !important}</style>`;
        },
      };

      template.print(printData, options, ext);
    });

    bus.$on("preview", function () {
      console.log(JSON.stringify(template.getJson()));
    });
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.hi-print-module-main-panel {
  height: 100%;
  background: #fff;
}

.main-panel-area {
  flex: 1;
  height: 100%;
  padding: 24px;
  overflow-y: scroll;
  overflow-x: scroll;
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
