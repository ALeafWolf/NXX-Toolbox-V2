<template>
  <section>
    <div class="sub-panel p-4">
      <h1 class="text-center text-3xl">
        {{ $t(`COMMON.${card.character.name}`) }} -
        {{ card[`name${$globalV.getLocalePostfix($i18n.locale)}`] }}
      </h1>
      <div class="base-panel p-4 card-section">
        <div>
          <img
            :src="`${imgUrl + card.character.name}/${card.name}-full.webp`"
            :alt="card.name"
          />
        </div>
        <div>
          <table class="text-xl w-full">
            <tr>
              <th>{{ $t("COMMON.RARITY") }}</th>
              <td>{{ card.rarity.value }}</td>
            </tr>
            <tr>
              <th>{{ $t("COMMON.ATTRIBUTE") }}</th>
              <td>
                <img
                  class="icon inline"
                  :src="require(`assets/images/${card.attribute}.png`)"
                  :alt="card.attribute"
                />
                {{ $t(`COMMON.${card.attribute}`) }}
              </td>
            </tr>
            <tr>
              <th>{{ $t("COMMON.INFLUENCE") }}</th>
              <td>{{ card.influence }}</td>
            </tr>
            <tr>
              <th>{{ $t("COMMON.DEFENSE") }}</th>
              <td>{{ card.defense }}</td>
            </tr>
          </table>
          <div>
            <div class="skill-row" v-for="(skill, i) in card.skills" :key="i">
              <div class="flex justify-center items-center">
                <NuxtLink
                  :to="
                    localePath(
                      `/skills/${$globalV.nameToSlug(
                        skill[`name${$globalV.getLocalePostfix($i18n.locale)}`]
                      )}`
                    )
                  "
                >
                  <img
                    class="icon"
                    :src="skill.skill_group.icon.url"
                    :alt="
                      skill[`name${$globalV.getLocalePostfix($i18n.locale)}`]
                    "
                  />
                </NuxtLink>
              </div>
              <div>
                <h2 class="text-lg">
                  {{ skill[`name${$globalV.getLocalePostfix($i18n.locale)}`] }}
                </h2>
                <p>
                  {{
                    skill.skill_group[
                      `description${$globalV.getLocalePostfix($i18n.locale)}`
                    ]
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AcquisitionTable
        :entries="card.card_acquisitions"
        :locale="$i18n.locale"
      />
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      imgUrl: this.$globalV.ihs,
      urls: ["weibo", "bilibili", "twitter", "youtube"],
    };
  },
  async asyncData({ $axios, app, route }) {
    const name = app.$globalV.slugToName(route.params.slug, app.i18n.locale);
    const card = await $axios
      .$get(`/api/card/detail/${encodeURIComponent(name)}`)
      .catch((error) => {
        console.log(error);
      });
    return {
      card,
    };
  },
  head() {
    return {
      title: `${this.$t("COMMON.CARD")}: ${this.card.name} | ${this.$t(
        "COMMON.TITLE-POSTFIX"
      )}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.$t("COMMON.CARD")}: ${this.card.name} | ${this.$t(
            "COMMON.TITLE-POSTFIX"
          )}`,
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.card-section {
  display: grid;
  grid-template-columns: 250px auto;
  gap: 60px;
}
.skill-row {
  display: grid;
  grid-template-columns: 50px auto;
  gap: 10px;
}
</style>
