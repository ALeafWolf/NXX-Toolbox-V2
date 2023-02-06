<template>
  <div v-if="isShow" class="loading-mask-container">
    <a-icon
      type="loading"
      :style="{
        fontSize: '40px',
        color: '#8e8baf',
      }"
    />
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

<style lang="scss" scoped>
.loading-mask-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
