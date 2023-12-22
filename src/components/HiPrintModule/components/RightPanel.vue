<!-- 
    filename: RightPanel.vue
    author: liubin
    date: 2023-12-22 09:34:52
    description: 
-->

<template>
  <div
    class="hi-print-module-right-panel"
    :class="{ hidden: hideRight ?? false }"
  >
    <!-- <el-button v-if="hideRight" icon="el-icon-arrow-right"></el-button> -->
    <section class="page-title">
      <!-- <el-button
        type="text"
        size="small"
        plain
        icon="el-icon-arrow-left"
      ></el-button> -->
      <h1 class="page-title__h1">属性</h1>
    </section>
    <section class="page-content" id="hiprint-options-area"></section>
  </div>
</template>

<script>
export default {
  name: "HiPrintModuleRightPanel",
  components: {},
  props: {},
  data() {
    return {
      hideRight: false,
    };
  },
  computed: {},
  methods: {},
};
</script>

<style scoped lang="scss">
.hi-print-module-right-panel {
  // background: #f3af85;
  background: #fff;
  border-left: 1px solid #ccc;
  height: 100%;
  transition: all 0.5s ease-out;
  display: flex;
  flex-direction: column;

  &.hidden {
    width: 0 !important;
    position: relative;
  }
}

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
  position: relative;
}

:deep(.page-content) {
  > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 10px);
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .prop-tabs {
    > button {
      margin-left: 16px;
    }
  }

  .prop-tab-items {
    padding: 0;
    display: flex;

    .prop-tab-item {
      flex: 1;
      text-align: center;
    }

    .active.prop-tab-item {
      border-bottom: none;
      color: #333;
      background: #e3e3e3;
    }
  }

  .hiprint-option-items {
    padding: 12px;
    // gap: 12px;
  }
}
</style>
