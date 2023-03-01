<template>
  <div class="home-grid">
    <div class="col-span-2 lg:col-span-1 flex justify-center items-center">
      <div class="p-6">
        <h1 class="text-center">{{ $t("HOME.WELCOME-SLUG") }}</h1>
        <img class="home-img" src="~/assets/images/初代2.png" alt="初代" />
      </div>
    </div>
    <div class="p-4 col-span-2 lg:col-span-1">
      <div>
        <h3 class="mb-4">{{ $t("COMMON.RECENT-UPDATE") }}</h3>
        <section class="py-2" v-if="update.card_list.length > 0">
          <h4>{{ $t("NAV.CARD-LIST") }}</h4>
          <div
            class="base-panel mb-2 px-4 py-2"
            v-for="(list, i) in update.card_list"
            :key="`cardList-${i}`"
          >
            <h5>{{ list.date }}</h5>
            <div class="grid grid-cols-4 gap-2">
              <div v-for="(card, j) in list.cards" :key="`card-${j}`">
                <NuxtLink
                  :to="
                    localePath(
                      `/cards/${$globalV.nameToSlug(
                        card[`name${$globalV.getLocalePostfix($i18n.locale)}`]
                      )}`
                    )
                  "
                >
                  <img
                    class="large-icon m-auto"
                    :src="card.thumbnail.url"
                    :alt="
                      card[`name${$globalV.getLocalePostfix($i18n.locale)}`]
                    "
                  />
                  <p class="text-center">
                    {{ card[`name${$globalV.getLocalePostfix($i18n.locale)}`] }}
                  </p>
                </NuxtLink>
              </div>
            </div>
          </div>
        </section>
        <section class="py-2" v-if="update.merch_list.length > 0">
          <h4>{{ $t("NAV.MERCH-LIST") }}</h4>
          <div
            class="base-panel mb-2 py-2 px-4"
            v-for="(list, i) in update.merch_list"
            :key="`merchList-${i}`"
          >
            <h5>{{ list.date }}</h5>
            <div class="grid grid-cols-4 gap-2">
              <div v-for="(merch, j) in list.merches" :key="`merch-${j}`">
                <NuxtLink :to="localePath(`/merches/${merch.id}`)">
                  <img
                    class="large-icon m-auto"
                    :src="merch.avatar.url"
                    :alt="merch.name"
                  />
                  <p class="text-center">{{ merch.name }}</p>
                </NuxtLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {};
  },
  async asyncData({ $axios }) {
    const update = await $axios
      .$get(`/api/recent-update`, {
        params: {
          populate: "*",
        },
      })
      .catch((error) => {
        console.log(error);
      });
    return {
      update,
    };
  },
  head() {
    return {
      title: `${this.$t("NAV.HOME")} | ${this.$t("COMMON.TITLE-POSTFIX")}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t("COMMON.META-DESCRIPTION"),
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.home-img {
  height: 100%;
  width: 100%;
  object-fit: contain;
  max-height: 250px;
}
.home-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}
@media all and (max-width: $lg) {
  .home-grid {
    grid-template-columns: 1fr 1.5fr;
    gap: 30px;
  }
}
@media all and (max-width: $lg) {
  .home-grid {
    grid-template-columns: 1fr;
  }
}
</style>
