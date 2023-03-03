<template>
  <div class="flex flex-col justify-center items-center">
    <img class="chudai" src="~assets/images/初代3.png" alt="" />
    <h1>oops</h1>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `Error | ${this.$t("COMMON.TITLE-POSTFIX")}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `Error | ${this.$t("COMMON.TITLE-POSTFIX")}`,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.chudai {
  height: 300px;
}
</style>
