<template>
  <div class="sub-panel grid grid-cols-2 gap-4">
    <div class="col-span-2 lg:col-span-1 flex justify-center items-center">
      <div class="p-6">
        <h1 class="text-3xl text-center">{{ $t("HOME.WELCOME-SLUG") }}</h1>
        <img id="homeImg" src="~/assets/images/初代2.png" alt="初代">
      </div>
    </div>
    <div class="p-6 col-span-2 lg:col-span-1">
      <div>
        <h2 class="text-2xl">{{ $t("COMMON.RECENT-UPDATE") }}</h2>
        <h3 class="text-xl">{{ $t("NAV.CARD-LIST") }}</h3>
        <div class="base-panel px-4 py-2">
          <div v-for="(list, i) in update.card_list" :key="`cardList-${i}`">
            <h4>{{ list.date }}</h4>
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
                  <h6 class="text-center">
                    {{ card[`name${$globalV.getLocalePostfix($i18n.locale)}`] }}
                  </h6>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <h3 class="text-xl mt-4">{{ $t("NAV.MERCH-LIST") }}</h3>
        <div
          class="base-panel p-2"
          v-for="(list, i) in update.merch_list"
          :key="`merchList-${i}`"
        >
          <h4>{{ list.date }}</h4>
          <div class="grid grid-cols-4 gap-2">
            <div v-for="(merch, j) in list.merches" :key="`merch-${j}`">
              <NuxtLink :to="localePath(`/merches/${merch.id}`)">
                <img
                  class="large-icon m-auto"
                  :src="merch.avatar.url"
                  :alt="merch.name"
                />
                <h6 class="text-center">{{ merch.name }}</h6>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  #homeImg{
    height: 100%;
    width: 100%;
    object-fit: contain;
    max-height: 250px;
  }
</style>
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
