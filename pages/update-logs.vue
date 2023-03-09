<template>
  <section></section>
</template>

<script>
export default {
  name: "UpdateLogsPage",
  data() {
    return {};
  },
  methods: {},
  head() {
    return {
      title: `${this.$t("NAV.UPDATE-LOG")} | ${this.$t(
        "COMMON.TITLE-POSTFIX"
      )}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.$t("NAV.UPDATE-LOG")} | ${this.$t(
            "COMMON.TITLE-POSTFIX"
          )}`,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
form > div {
  display: flex;
  flex-direction: column;
}
</style>
