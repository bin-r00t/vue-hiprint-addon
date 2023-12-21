<template>
  <div class="VueClodopPreviewView">
    <component ref="root" :is="loadedComponent" v-bind="bind" />
  </div>
</template>

<script>
function parseData(dataObj) {
  if (dataObj == null) return null;
  const data = {};
  Object.keys(dataObj).forEach((key) => {
    const v = dataObj[key];
    switch (v.type) {
      case "string":
        data[key] = v.default || "";
        break;
      case "number":
        data[key] = v.default || null;
        break;
      case "boolean":
        data[key] = v.default || false;
        break;
      case "array":
        data[key] = v.default || [];
        break;
      case "object":
        data[key] = parseData(v.default || null);
        break;
    }
  });
  return data;
}

function parseStr(str, hasVariable = false) {
  if (!hasVariable) return str;
  console.log("parseStr", str);
  let _ = "";
  eval("_ = `"+str+"`");
  return _;
}

function parserRender(domArray, h) {
  const currentLevel = [domArray[0], domArray[1], []];
  if (Array.isArray(domArray[2])) {
    domArray[2].forEach((da) => {
      currentLevel[2].push(parserRender(da, h));
    });
  } else {
    currentLevel[2] = parseStr(domArray[2], /\$\{.*\}/.test(domArray[2]));
    // currentLevel[2] = domArray[2].replaceAll(/\+\+\+\$/g, "\$");
    // if (domArray[2].indexOf("{{{")) {
    //   currentLevel[2] = domArray[2].replaceAll(/\{\{\{/g, "\$");
    // }
  }
  return h(...currentLevel);
}

export default {
  name: "VueClodopPreviewView",
  components: {},
  props: {
    content: {
      type: String,
      default: "",
    },
    bind: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      loadedComponent: null,
      test: {
        render: function (h) {
          return h("h1", { style: { color: "red" } }, "hello world");
        },
      },
    };
  },
  mounted() {
    const defaultComponent = {
      name: "default_component",
      render() {
        return <h1>default</h1>;
      },
    };

    if (!this.content || this.content.trim() === "") {
      this.loadedComponent = defaultComponent;
      return;
    }

    const jsonLayer = JSON.parse(this.content);
    jsonLayer.data = function () {
      return { ...parseData(jsonLayer.data) };
    };

    let rdr = [...jsonLayer.render];
    console.log("this.content", this.content, jsonLayer, rdr);

    jsonLayer.render = function (h) {
      // return h("h1", null, `test ${this.prop1}`);
      return parserRender(rdr, h);
    };

    console.log("component is", jsonLayer);
    this.loadedComponent = jsonLayer;
  },
  computed: {},
  methods: {},
};
</script>

<style scoped lang="scss">
.VueClodopPreviewView {
}
</style>
