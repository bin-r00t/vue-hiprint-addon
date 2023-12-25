<!-- 
    filename: LeftPanel.vue
    author: liubin
    date: 2023-12-22 09:34:36
    description: 
-->

<template>
  <div class="flex-col hi-print-module-left-panel" ref="control-panel">
    <!--  折叠面板 -->
    <el-collapse v-model="activeName" accordion class="left-panel-collapse">
      <!-- 操作  -->
      <el-collapse-item title="操作" name="operations">
        <el-button type="warning" plain @click="handlePreview">预览</el-button>
        <el-button type="primary" plain @click="handlePrint">打印</el-button>
        <el-button plain @click="handleSave">保存</el-button>
      </el-collapse-item>
      <!-- 画布设置  -->
      <el-collapse-item title="画布设置" name="panel-settings">
        <el-form ref="panel-setting__form" :model="form">
          <!-- 画布大小  -->
          <el-form-item label="画布大小">
            <el-radio-group size="small" v-model="form.panelSize">
              <el-radio-button
                v-for="btn in settings.panelSizeList"
                :key="btn.label"
                :label="btn.label"
              ></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <!-- 自定义  -->
          <el-form
            inline
            label-position="top"
            v-if="isCustomSize"
            :model="customSize"
          >
            <h3>自定义</h3>
            <div
              style="
                margin-top: 12px;
                display: flex;
                gap: 8px;
                align-items: center;
              "
            >
              <el-input
                size="small"
                clearable
                v-model="customSize.width"
                type="number"
                placeholder="宽度"
              ></el-input>
              <i class="el-icon-close" />
              <el-input
                size="small"
                clearable
                v-model="customSize.height"
                type="number"
                placeholder="高度"
              ></el-input>
            </div>
            <el-row style="margin-top: 12px; text-align: right">
              <el-button
                type="primary"
                size="small"
                plain
                @click="handleCustomSize"
                >确定</el-button
              >
            </el-row>
          </el-form>
        </el-form>
      </el-collapse-item>
      <!-- 基本元素  -->
      <el-collapse-item title="基本元素" name="basic-elements">
        <div class="basic-elements-list">
          <div class="ep-draggable-item" tid="defaultModule.text">
            <i class="el-icon-s-order" style="font-size: 28px" />
            <span>文本</span>
          </div>
          <div class="ep-draggable-item" tid="defaultModule.longText">
            <i class="el-icon-s-order" style="font-size: 28px" />
            <span>长文本</span>
          </div>
          <div class="ep-draggable-item" tid="defaultModule.image">
            <i class="el-icon-picture-outline" style="font-size: 28px" />
            <span>图片</span>
          </div>
          <div class="ep-draggable-item" tid="defaultModule.table">
            <i class="el-icon-s-grid" style="font-size: 28px" />
            <span>表格</span>
          </div>
          <div class="ep-draggable-item" tid="defaultModule.emptyTable">
            <i class="el-icon-s-grid" style="font-size: 28px" />
            <span>空表格</span>
          </div>
          <div class="ep-draggable-item" tid="defaultModule.hline">
            <span class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-minus"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12l14 0"></path>
              </svg>
            </span>
            <span>横线</span>
          </div>
          <div class="ep-draggable-item" tid="defaultModule.vline">
            <span class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-minus-vertical"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 5v14"></path>
              </svg>
            </span>
            <span>竖线</span>
          </div>
          <div class="ep-draggable-item" tid="defaultModule.rect">
            <span class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-rectangle"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"
                ></path>
              </svg>
            </span>
            <span>矩形</span>
          </div>
          <div class="ep-draggable-item" tid="defaultModule.oval">
            <span class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-circle"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
              </svg>
            </span>
            <span>椭圆</span>
          </div>
          <div class="ep-draggable-item" tid="defaultModule.barcode">
            <span class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-barcode"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M4 7v-1a2 2 0 0 1 2 -2h2"></path>
                <path d="M4 17v1a2 2 0 0 0 2 2h2"></path>
                <path d="M16 4h2a2 2 0 0 1 2 2v1"></path>
                <path d="M16 20h2a2 2 0 0 0 2 -2v-1"></path>
                <path d="M5 11h1v2h-1z"></path>
                <path d="M10 11l0 2"></path>
                <path d="M14 11h1v2h-1z"></path>
                <path d="M19 11l0 2"></path>
              </svg>
            </span>
            <span>条形码</span>
          </div>
          <div class="ep-draggable-item" tid="defaultModule.qrcode">
            <span class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-qrcode"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"
                ></path>
                <path d="M7 17l0 .01"></path>
                <path
                  d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"
                ></path>
                <path d="M7 7l0 .01"></path>
                <path
                  d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"
                ></path>
                <path d="M17 7l0 .01"></path>
                <path d="M14 14l3 0"></path>
                <path d="M20 14l0 .01"></path>
                <path d="M14 14l0 3"></path>
                <path d="M14 20l3 0"></path>
                <path d="M17 17l3 0"></path>
                <path d="M20 17l0 3"></path>
              </svg>
            </span>
            <span>二维码</span>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import bus from "../bus";

export default {
  name: "HiPrintModuleLeftPanel",
  components: {},
  props: {},
  inject: ["hiprint"],
  data() {
    return {
      activeName: "operations", // "basic-elements",
      settings: {
        panelSizeList: [
          {
            label: "A3",
            value: {
              width: 420,
              height: 296.6,
            },
          },
          {
            label: "A4",
            value: {
              width: 210,
              height: 296.6,
            },
          },
          {
            label: "A5",
            value: {
              width: 210,
              height: 147.6,
            },
          },
          {
            label: "B3",
            value: {
              width: 500,
              height: 352.6,
            },
          },
          {
            label: "B4",
            value: {
              width: 250,
              height: 352.6,
            },
          },
          {
            label: "B5",
            value: {
              width: 250,
              height: 175.6,
            },
          },
          { label: "自定义", value: null },
        ],
      },
      form: {
        panelSize: "A4",
      },
      customSize: {
        width: null,
        height: null,
      },
      isCustomSize: false,
      currentPaperSize: {
        type: "A4",
        width: 210,
        height: 296.6,
      },
    };
  },
  mounted() {
    hiprint.PrintElementTypeManager.buildByHtml($(".ep-draggable-item"));
  },
  computed: {},
  watch: {
    "form.panelSize"(val) {
      if (val === "自定义") {
        this.isCustomSize = true;
      } else {
        this.isCustomSize = false;
        const size = this.settings.panelSizeList.find((e) => e.label === val);
        this.setPaper(val, size.value);
      }
    },
  },
  methods: {
    handlePreview() {
      bus.$emit("preview", {});
    },
    handlePrint() {
      bus.$emit("print", {});
    },
    handleCustomSize() {
      if (!this.customSize.width || !this.customSize.height) {
        this.$message.error("请输入宽度和高度");
        return;
      }
      bus.$emit("size", {
        width: this.customSize.width,
        height: this.customSize.height,
      });
    },
    /**
     * 设置纸张大小
     * @param type [A3, A4, A5, B3, B4, B5, other]
     * @param value {width,height} mm
     */
    setPaper(type, value) {
      try {
        if (this.settings.panelSizeList.find((e) => e.label === type)) {
          this.currentPaperSize = {
            type: type,
            width: value.width,
            height: value.height,
          };
          bus.$emit("size", { width: value.width, height: value.height });
        } else {
          this.currentPaperSize = {
            type: "other",
            width: value.width,
            height: value.height,
          };
          bus.$emit("size", { width: value.width, height: value.height });
        }
      } catch (error) {
        this.$message.error(`操作失败: ${error}`);
      }
    },
  },
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

  .basic-elements-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
}

:deep(.left-panel-collapse) {
  .el-collapse-item__header[role="button"] {
    padding-left: 12px !important;
    font-weight: 700;
  }

  .el-collapse-item__content {
    padding-left: 12px;
    padding-right: 12px;
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
