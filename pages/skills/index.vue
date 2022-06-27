<template>
  <section>
    <div class="wrapper">
      <h1>Skills</h1>
      <table class="w-full">
        <thead>
          <tr>
            <th rowspan="2">Icon</th>
            <th rowspan="2">Name</th>
            <th rowspan="2">Description</th>
            <th colspan="2">Numbers</th>
          </tr>
          <tr>
            <th>Lv 1</th>
            <th>Lv 10</th>
          </tr>
        </thead>
        <tbody v-for="(group, i) in skillGroups" :key="i">
          <tr v-for="(skill, j) in group.skills" :key="j">
            <td v-if="j === 0" :rowspan="group.skills.length">
              <NuxtLink :to="`/skills/${skill.slug}`">
                <img
                  :src="`${imgUrl}/技能/${group.img_ref}.webp`"
                  :alt="skill.name"
              /></NuxtLink>
            </td>
            <td>
              <NuxtLink :to="`/skills/${skill.slug}`">
                {{ skill.name }}</NuxtLink
              >
            </td>
            <td>{{ skill.description }}</td>
            <td>{{ skill.number.lv1 }}</td>
            <td>{{ skill.number.lv10 }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: this.$globalV.ihs,
    };
  },
  async asyncData({ $axios, app }) {
    const skillGroups = await $axios
      .$get("/api/skill-groups", {
        params: {
          locale: app.i18n.locale,
        },
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
    return {
      skillGroups,
    };
  },
  head() {
    return {
      title: `技能 | 牛叉叉牌工具箱`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `技能 | 牛叉叉牌工具箱`,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
section {
  display: flex;
  justify-content: center;
}
</style>
