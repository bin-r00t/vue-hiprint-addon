import VueClodopPreview from "./vue-clodop-preview.vue";
import VueClodopDesign from "./vue-clodop-design.vue";

VueClodopDesign.install = function (Vue) {
  Vue.component(VueClodopDesign.name, VueClodopDesign);
};

VueClodopPreview.install = function (Vue) {
  Vue.component(VueClodopPreview.name, VueClodopPreview);
};

export { VueClodopDesign, VueClodopPreview };
