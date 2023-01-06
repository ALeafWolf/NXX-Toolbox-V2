<template>
  <section>
    <div class="sub-panel p-4">
      <h1 class="text-center">
        {{ $t(`COMMON.${card.character.name}`) }} - {{ card.name }}
      </h1>
      <div class="card-section">
        <div>
          <img
            :src="`${imgUrl + card.character.name}/${card.img_ref}-full.webp`"
            :alt="card.name"
          />
        </div>
        <div>
          <div class="flex">
            <table>
              <tr>
                <th>Rarity</th>
                <td>{{ card.rarity.value }}</td>
              </tr>
              <tr>
                <th>Attribute</th>
                <td>{{ card.attribute }}</td>
              </tr>
              <tr>
                <th>Infludence</th>
                <td>{{ card.influence }}</td>
              </tr>
              <tr>
                <th>Defense</th>
                <td>{{ card.defense }}</td>
              </tr>
            </table>
            <div>
              <div class="skill-row" v-for="(skill, i) in card.skills" :key="i">
                <NuxtLink :to="`/skills/${skill.slug}`">
                  <img
                    class="icon"
                    :src="`${imgUrl}/技能/${skill.skill_group.img_ref}.webp`"
                    :alt="skill.name"
                  />
                </NuxtLink>
                <h2>{{ skill.name }}</h2>
                <p>{{ skill.skill_group.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Start</th>
            <th>End</th>
            <th>Server</th>
            <th>Type</th>
            <th>Subtype</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, i) in card.card_acquisitions" :key="i">
            <td>{{ record.start }}</td>
            <td>{{ record.end }}</td>
            <td>{{ record.server }}</td>
            <td>{{ record.type }}</td>
            <td>{{ record.subtype }}</td>
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
      urls: ["weibo", "bilibili", "twitter", "youtube"],
    };
  },
  async asyncData({ $axios, app, route }) {
    const name = app.$globalV.slugToName(route.params.slug, app.i18n.locale);
    const card = await $axios
      .$get(`/api/card/detail/${encodeURIComponent(name)}`, {
        params: {
          locale: app.i18n.locale,
        },
      })
      .catch((error) => {
        console.log(error);
      });
    return {
      card,
    };
  },
  head() {
    return {
      title: `思绪: ${this.card.name} | 牛叉叉牌工具箱`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `思绪:  ${this.card.name} | 牛叉叉牌工具箱`,
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.card-section {
  display: grid;
  grid-template-columns: 300px auto;
  gap: 60px;
}
.skill-row {
  display: block;
}
</style>
