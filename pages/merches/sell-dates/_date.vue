<template>
  <div>
    <h2>
      {{ $route.params.date }}
      <a class="inline-block" v-if="url" :href="url" target="_blank">
        <img
          class="icon"
          :src="require(`~/assets/images/icons/icon-weibo.png`)"
          :alt="`新浪微博`"
        />
      </a>
    </h2>

    <template v-for="(e, i) in entries">
      <section v-if="e.merches.length > 0" :key="i" class="base-panel p-4 mb-2">
        <h3>
          {{
            e.end
              ? `${$t("MERCH.LIMITED-TIME")} (${$t("MERCH.UNTIL")}${e.end})`
              : $t("MERCH.PERMANENT")
          }}
        </h3>
        <div
          class="grid xl:grid-cols-6 lg:grid-cols-4 gap-3 md:grid-cols-3 grid-cols-2"
        >
          <MerchGridItem
            v-for="(merch, i) in e.merches"
            :merch="merch"
            :key="i"
          />
        </div>
      </section>
    </template>
  </div>
</template>

<script>
export default {
  name: "SellDateDetailPage",
  async asyncData({ $axios, route }) {
    const entries = await $axios
      .$get(`/api/date-list/entries`, {
        params: {
          filters: {
            start: {
              $eq: route.params.date,
            },
          },
          sort: ["end:desc"],
        },
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
    let url = entries[0].url;
    return {
      entries,
      url,
    };
  },
  head() {
    return {
      title: `${this.$t("NAV.MERCH-LIST")}: ${this.$t("MERCH.SELL-DATE")} - ${
        this.$route.params.date
      }} | ${this.$t("COMMON.TITLE-POSTFIX")}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.$t("NAV.MERCH-LIST")}: ${this.$t(
            "MERCH.SELL-DATE"
          )} - ${this.$route.params.date}} | ${this.$t(
            "COMMON.TITLE-POSTFIX"
          )}`,
        },
      ],
    };
  },
};
</script>
