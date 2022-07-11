<template>
  <section>
    <div class="wrapper">
      <h1>Cards</h1>
      <table class="w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Rarity</th>
            <th>Attribute</th>
            <th>Influence</th>
            <th>Defense</th>
            <th>Skills</th>
            <th>Acquisition Method</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(card, i) in cards" :key="i">
            <td>
              <img
                style="height: 100px; width: 100px"
                :src="`${imgUrl}/${card.character.name}/${card.img_ref}.webp`"
                :alt="card.name"
              />
            </td>
            <td>
              <NuxtLink :to="`/cards/${card.slug}`"> {{ card.name }}</NuxtLink>
            </td>
            <td>{{ card.rarity.value }}</td>
            <td>
              <img
                class="icon"
                :src="require(`~/assets/images/icons/${card.attribute}.png`)"
                :alt="card.attribute"
              />
            </td>
            <td>{{ card.influence }}</td>
            <td>{{ card.defense }}</td>
            <td>
              <div class="flex h-full items-center">
                <NuxtLink
                  v-for="(skill, j) in card.skills"
                  :key="j"
                  :to="`/skills/${skill.slug}`"
                >
                  <img
                    class="icon"
                    :src="`${imgUrl}/技能/${skill.img_ref}.webp`"
                    :alt="skill.name"
                  />
                </NuxtLink>
              </div>
            </td>
            <td>
              <div v-for="(ca, o) in card.card_acquisitions" :key="o">
                {{ ca.value }}
              </div>
            </td>
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
    const cards = await $axios
      .$get("/api/card/list", {
        params: {
          locale: app.i18n.locale,
        },
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
    return {
      cards,
    };
  },
  head() {
    return {
      title: `思绪 | 牛叉叉牌工具箱`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `思绪 | 牛叉叉牌工具箱`,
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped></style>
