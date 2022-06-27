<template>
  <div>
    <!-- <h2>{{skill.data.attributes.name}}</h2> -->
  </div>
</template>
<script>
export default {
  async asyncData({ $axios, route, app }) {
    const slug = route.params.slug;
    const skill = await $axios
      .$get(`/api/skills?filters[slug][$eq]=${slug}`, {
        params: {
        //   filters: {
        //     slug: {
        //       $eq: "sheng-xian-duo-shi-2",
        //     },
        //   },
        //   populate: "*",
        locale: app.i18n.locale
        },
      })
      .catch((err) => {
        console.log(err);
      });
    return {
      skill: skill.data,
    };
  },
};
</script>
<style lang="scss" scoped></style>
