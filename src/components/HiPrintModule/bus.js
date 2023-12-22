import Vue from "vue";

export default new Vue({
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
