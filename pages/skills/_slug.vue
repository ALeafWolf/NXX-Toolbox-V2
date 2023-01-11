<template>
  <section class="px-6">
    <img
      class="large-icon m-auto"
      :src="skill.skill_group.icon.url"
      :alt="skill[`name${$globalV.getLocalePostfix($i18n.locale)}`]"
    />
    <div class="flex w-full skill-tab-row">
      <NuxtLink
        v-for="(s, i) in skill.skill_group.skills"
        :key="i"
        :to="
          localePath(
            `/skills/${$globalV.nameToSlug(
              s[`name${$globalV.getLocalePostfix($i18n.locale)}`]
            )}`
          )
        "
        class="skill-tab text-center flex-1 py-2"
        :class="{ skillSelected: skill.name === s.name }"
      >
        {{ s.variant }} {{ s.rank }}
      </NuxtLink>
    </div>
    <div
      class="flex justify-center items-center flex-col text-center skill-detail-block"
    >
      <h2 class="text-center text-xl">{{ skill[`name${$globalV.getLocalePostfix($i18n.locale)}`] }}</h2>
      <div>
        {{
          $globalV.getDesWithRound(skill.skill_group[`description${$globalV.getLocalePostfix($i18n.locale)}`], skill.variant)
        }}
      </div>
      <div class="skill-num-grid w-full">
        <div
          v-for="(num, i) in getAllSkillNum(
            skill.number.lv1,
            skill.number.lv10
          )"
          :key="i"
        >
          <div>lv{{ i + 1 }}</div>
          <div>{{ num }}</div>
        </div>
      </div>
      <div class="card-grid w-full p-3">
        <NuxtLink
          v-for="(card, j) in skill.relate_cards"
          :key="j"
          :to="
          localePath(
            `/cards/${$globalV.nameToSlug(
              card[`name${$globalV.getLocalePostfix($i18n.locale)}`]
            )}`
          )
        "
        >
          <img
            class="img-fluid"
            :src="card.thumbnail.url"
            :alt="card[`name${$globalV.getLocalePostfix($i18n.locale)}`]"
          />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  async asyncData({ $axios, route, app }) {
    const slug = route.params.slug;
    const skill = await $axios
      .$get(`/api/skill/detail`, {
        params: {
          name: app.$globalV.slugToName(slug, app.i18n.locale),
        },
      })
      .catch((err) => {
        console.log(err);
      });
    return {
      skill: skill[0],
    };
  },
  methods: {
    getAllSkillNum(lv1, lv10) {
      const arr = new Array(10);
      arr[0] = lv1;
      arr[9] = lv10;
      const diff = (lv10 - lv1) / 9;
      for (let i = 1; i < 9; i++) {
        arr[i] = Math.round((lv1 + diff * i + Number.EPSILON) * 100) / 100;
      }
      return arr;
    },
  },
  head() {
    return {
      title: `${this.$t("NAV.SKILL-LIST")}: ${this.skill[`name${this.$globalV.getLocalePostfix(this.$i18n.locale)}`]} | ${this.$t("COMMON.TITLE-POSTFIX")}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.skill.name} | 牛叉叉牌工具箱`,
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.skill-tab-row {
  border-top: 1px solid rgb(62, 62, 62);
  border-bottom: 1px solid rgb(62, 62, 62);
}
.skill-tab {
  background-color: rgba(35, 38, 50, 0.5);
}
.skillSelected {
  border-bottom: 2px solid #fff;
  background: linear-gradient(
    rgba(60, 64, 77, 0.75) 0%,
    rgba(76, 76, 133, 1) 100%
  );
}
.skill-detail-block {
  background-color: rgba(0, 0, 0, 0.5);
  & > * {
    margin-bottom: 15px;
  }
}
.skill-num-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
}
</style>
