<!-- 
    filename: LeftPanel.vue
    author: liubin
    date: 2023-12-22 09:34:36
    description: 
-->

<template>
  <div class="flex-col hi-print-module-left-panel" ref="control-panel">
    <div class="page-title">基础元素</div>
    <!-- tid 与 defaultElementTypeProvider 中对应 -->
    <!-- 包含 class="ep-draggable-item" -->
    <div class="page-content">
      <div class="page-content__inner">
        <div class="ep-draggable-item" tid="defaultModule.text">
          <i class="el-icon-s-order" style="font-size: 28px" />
          <span>文本</span>
        </div>
        <div class="ep-draggable-item" tid="defaultModule.image">
          <i class="el-icon-picture" style="font-size: 28px" />
          <span>图片</span>
        </div>
        <div class="ep-draggable-item" tid="defaultModule.table">
          <i class="el-icon-s-grid" style="font-size: 28px" />
          <span>表格</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HiPrintModuleLeftPanel",
  components: {},
  props: {},
  inject: ["hiprint"],
  data() {
    return {};
  },
  mounted() {
    console.log("[setup] left...", hiprint);
    debugger;
    hiprint.PrintElementTypeManager.buildByHtml($(".ep-draggable-item"));
  },
  computed: {},
  methods: {},
};
</script>

<style scoped lang="scss">
.hi-print-module-left-panel {
  background: #fff;
  border-right: 1px solid #ccc;
  height: 100%;

  .page-title {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-bottom: 1px solid #ccc;
    .page-title__h1 {
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 1px;
    }
  }

  .page-content {
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
  }

  .page-content__inner {
    display: flex;
  }
}

.ep-draggable-item {
  margin: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  color: #777;
  transition: all 0.3s ease-out;

  &:hover {
    color: #000;
    background: #e3e3e3;
  }
}
</style>
