<!-- 
    filename: MainPanel.vue
    author: liubin
    date: 2023-12-22 09:34:11
    description: 
-->

<template>
  <div class="hi-print-module-main-panel">
    <div id="hiprint-template-area"></div>
  </div>
</template>

<script>
import bus from "../bus";
import jsondata from './test.data.json'

export default {
  name: "HiPrintModuleMainPanel",
  components: {},
  props: {},
  data() {
    return {};
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
  background: #fff;
  height: 100%;
  padding: 24px;
  overflow-y: scroll;
  overflow-x: scroll;
}
</style>
