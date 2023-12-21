import { VueClodopDesign, VueClodopPreview } from "./vue-clodop-views";

const components = [VueClodopDesign, VueClodopPreview];

const install = function (Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export { VueClodopDesign, VueClodopPreview };

export default { install };
