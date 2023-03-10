<template>
  <div class="grid gap-4">
    <section class="p-4 base-panel" v-for="l, i in logs.data.attributes.item" :key="i">
      <h4>{{ l.date }}</h4>
      <div v-html="l.content"></div>
    </section>
  </div>
</template>

<script>
export default {
  name: "UpdateLogsPage",
  async asyncData({ $axios }) {
    const logs = await $axios
      .$get(`/api/update-log`, {
        params: {
          populate: "*",
        },
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
    return {
      logs,
    };
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
