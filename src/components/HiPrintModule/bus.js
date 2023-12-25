import Vue from "vue";

const bus = new Vue({
  name: "message-bus",
  data() {
    return {
      template: null,
    };
  },
  methods: {
    setTemplate(template) {
      this.template = template;
    },
  },
});

bus.$on("print", (data) => {
  bus.template.print(
    { name: "New Print" },
    { leftOffset: -1, topOffset: -1 },
    {
      callback: () => {
        // console.log("浏览器窗口已打开");
        // console.log("准备打印");
      },
      styleHandler: () => {
        return `<style>.hiprint-printElement-text{color:red !important}</style>`;
      },
    }
  );
});
// 预览
bus.$on("preview", (data) => {
  console.log(JSON.stringify(bus.template.getJson()));
});
// 缩放
bus.$on("scale", (size) => {
  bus.template.zoom((+size / 100).toFixed(2));
});

function blobToFile(blob, name) {
  return new File([blob], name ?? "导出文件.pdf", {
    type: "application/pdf",
  });
}

// 导出pdf
bus.$on("pdf", ({ name, type }) => {
  bus.template
    .toPdf({ name: "导出 PDF" }, name ?? "导出文件", {
      isDownload: false,
      type: type,
    })
    .then((blob) => {
      console.log("type:", type, blob);
      const file = blobToFile(blob, name ?? "导出文件");
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name ?? "导出文件"}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
});
// 保存至服务器
bus.$on("save", (data) => {});
// 从服务器拉取
bus.$on("load", (data) => {});
// 纸张
bus.$on("size", ({ width, height }) => {
  bus.template.setPaper(width, height);
});
// 设置模板
bus.$on("template", (template) => {
  bus.template = template;
});
// 清空模块
bus.$on("clean", () => {
  bus.template.clear();
});

export default bus;
