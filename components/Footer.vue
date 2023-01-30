<template>
  <footer class="base-panel px-4 py-2">
    <h1>ALeafWolf {{ getCurrentYear() }}</h1>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  methods: {
    getCurrentYear(){
      return new Date().getFullYear();
    }
  }
}
</script>

<style lang="scss" scoped>
footer {
  height: $footer-height;
  width: calc(100% - $float-space * 2);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 $float-space;
}
@media all and (max-width: $sm) {
  footer {
    margin: 0;
    width: 100%;
  }
}
</style>
