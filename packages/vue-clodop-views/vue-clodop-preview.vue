<template>
  <div class="VueClodopPreviewView">
    <component ref="root" :is="loadedComponent" v-bind="bind" />
  </div>
</template>

<script>
// function parseFunc(data) {
//   if (typeof data === "function") {
//     return data.toString().replaceAll(/\s+/g, " ").replaceAll("\n", " ");
//   } else if (typeof data === "object") {
//     for (const key in data) {
//       data[key] = parseFunc(data[key]);
//     }
//   }
//   return data;
// }

// function parseFunc(str) {
//   let _ = null;
//   eval(`_ = ${str}`);
//   return _;
// }

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

function parseRender2(domNode) {
  debugger;
  Object.keys(domNode).forEach((el) => {
    console.log("handling .... ", el);
    const middle = {};
    const children = [];
    if ("style" in domNode[el]) middle.style = domNode[el].style;
    if ("class" in domNode[el]) middle.class = domNode[el].class;
    if ("children" in domNode[el]) {
      console.log("handle children", domNode[el].children);
      if (typeof domNode[el].children == "string") {
        children.push(domNode[el].children[key]);
      } else {
        Object.keys(domNode[el].children).forEach((key) => {
          if (typeof domNode[el].children[key] == "string") {
            children.push(domNode[el].children[key]);
          } else {
            children.push(parseRender(domNode[el].children[key]));
          }
        });
      }
    }
  });
  return `h(${el}, ${middle}, ${children})`;
}

function parserRender(domArray, h) {
  console.log("parsing ....", domArray, h);
  // if (typeof domArray[2] == "string" || domArray[2] == null) return domArray[2];
  const currentLevel = [domArray[0], domArray[1], []];
  if (Array.isArray(domArray[2])) {
    domArray[2].forEach((da) => {
      currentLevel[2].push(parserRender(da, h));
    });
  } else {
    currentLevel[2] = domArray[2]
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
    // test.render = test.render.toString().replaceAll(/\s+/g, ' ').replaceAll('\n',' ')
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

    // let tewt = Object.assign({}, jsonLayer.render);
    let rdr = [...jsonLayer.render];
    console.log(
      "this.content",
      this.content,
      jsonLayer,
      rdr
      // parserRender(rdr)
      // tewt,
      // parseRender(tewt)
    );

    jsonLayer.render = function (h) {
      // return h("h1", null, `test ${this.prop1}`);
      return parserRender(rdr, h);
    };

    console.log("component is", jsonLayer);
    // jsonLayer.render = parseFunc(jsonLayer.render);
    // eval(`this.loadedComponent = ${jsonLayer}`);
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
