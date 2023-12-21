<!-- 
    filename: PreviewView.vue
    author: liubin
    date: 2023-12-21 13:31:31
    description: 
-->

<template>
  <div class="PreviewView" style="height: 100%; width: 100%">
    <Spinner v-if="loading" style="position: absolute; top: 50%; left: 50%" />
    <VueClodopPreviewView
      v-else
      :content="previewContent"
      :bind="{ prop1: 'nihao' }"
    />
  </div>
</template>

<script>
import { Spinner } from "element-ui";

export default {
  name: "PreviewView",
  components: { Spinner },
  props: {},
  data() {
    return {
      loading: true,
      previewContent: null,
      // previewContent: `{
      //     name: 'test',
      //     props: ['c', 'd'],
      //     data() {
      //       return {
      //         a: 1,
      //         b: 2
      //       }
      //     },
      //     render(h) {
      //       return h('h1', {style: {color: 'red', textDecoration: 'underline'}}, [h('div', null,'hello world' + this.a ), this.c && this.d ? h('p', null, this.c || '' + ' & ' + this.d || '')  : ''])
      //     }
      //   }`,
    };
  },
  mounted() {
    this.loading = true;
    fetch("http://localhost:9090/template/1")
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        this.previewContent = res.data;
        this.loading = false;
      })
      .catch((err) => console.error);
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.PreviewView {
  padding: 20px;
  background: #fff;
  border: 1px solid #ccc;
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
