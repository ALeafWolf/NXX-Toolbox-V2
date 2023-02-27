<template>
  <div v-if="isShow" id="loadingMaskContainer">
    <a-icon type="loading" />
  </div>
</template>

<script>
export default {
  name: "LoadingMask",
  props: {
    isShow: Boolean,
  },
};
</script>

<style lang="scss">
#loadingMaskContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  svg {
    font-size: 60px;
    fill: #8e8baf;
  }
}
</style>
