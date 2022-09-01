<template>
  <div class="wrapper">
    <h2 class="text-center text-xl">{{ skill.name }}</h2>
    <div class="flex w-full">
      <NuxtLink
        v-for="(s, i) in skill.skill_group.skills"
        :key="i"
        :to="`/skills/${s.slug}`"
        class="bg-gray-300 text-center flex-1 mx-3"
        :class="{skillSelected: skill.slug === s.slug}"
      >
        {{ s.rank }} {{ s.variant }}
      </NuxtLink>
    </div>
    <div class="flex justify-center items-center flex-col text-center">
      <img
        style="width: 80px; height: 80px"
        :src="`${imgUrl}/技能/${skill.skill_group.img_ref}.webp`"
        :alt="skill.name"
      />
      <div>{{ skill.description }}</div>
      <div>{{ skill.number.lv1 }} / {{ skill.number.lv10 }}</div>
      <div class="flex">
        <NuxtLink v-for="(card, j) in skill.relate_cards" :key="j" :to="`/cards/${card.slug}`">
          <img
            style="width: 80px; height: 80px"
            :src="`${imgUrl}/${card.character.name}/${card.img_ref}.webp`"
            :alt="skill.name"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgUrl: this.$globalV.ihs,
    };
  },
  async asyncData({ $axios, route, app }) {
    const slug = route.params.slug;
    const skill = await $axios
      .$get(`/api/skill/detail`, {
        params: {
          slug: slug,
          locale: app.i18n.locale,
        },
      })
      .catch((err) => {
        console.log(err);
      });
    return {
      skill: skill[0],
    };
  },
};
</script>
<style lang="scss" scoped>
  .skillSelected{
    background-color: blue;
    color: white;
  }
</style>
