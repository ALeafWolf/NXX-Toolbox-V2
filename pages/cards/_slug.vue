<template>
  <div>
    <div class="wrapper grid grid-cols-3 gap-3">
      <section class="row-span-2">
        <img
          class="img-fluid"
          :src="`${imgUrl}${card.character.name}/${card.img_ref}-full.webp`"
          :alt="card.name"
        />
      </section>
      <section>
        <table class="w-full">
          <thead>
            <tr>
              <th colspan="2" class="text-center">Info</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Name</th>
              <td>{{ card.name }}</td>
            </tr>
            <tr>
              <th>Rarity</th>
              <td>{{ card.rarity.value }}</td>
            </tr>
            <tr>
              <th>Attribute</th>
              <td>
                <img
                  class="icon"
                  :src="require(`~/assets/images/icons/${card.attribute}.png`)"
                  :alt="card.attribute"
                />
              </td>
            </tr>
            <tr>
              <th>Influence</th>
              <td>{{ card.influence }}</td>
            </tr>
            <tr>
              <th>Defense</th>
              <td>{{ card.defense }}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <table class="w-full">
          <thead>
            <tr>
              <th colspan="3" class="text-center">Skills</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(skill, i) in card.skills" :key="i">
              <th>
                <img
                  class="icon"
                  :src="`${imgUrl}/技能/${skill.img_ref}.webp`"
                  :alt="skill.name"
                />
              </th>
              <th>{{ skill.name }}</th>
              <td>{{ skill.description }}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section v-if="card.history.length !== 0" class="col-span-2">
        <table class="w-full">
          <thead>
            <tr>
              <th colspan="3">History</th>
            </tr>
            <tr>
              <th>Time/Period</th>
              <th>Acquisitions</th>
              <th>Related Official Post</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(history, i) in card.history" :key="i">
              <th>{{ history.start }} ~ {{ history.end }}</th>
              <td>{{ history.type }}</td>
              <td>
                <a v-if="history.weibo" :href="history.weibo" target="_blank">
                  <img
                    class="icon"
                    :src="require(`~/assets/images/icons/icon-weibo.png`)"
                    alt="Weibo"
                  />
                </a>
                <a v-if="history.bilibili" :href="history.bilibili" target="_blank">
                  <img
                    class="icon"
                    :src="require(`~/assets/images/icons/icon-bilibili.png`)"
                    alt="Bilibili"
                  />
                </a>
                <a v-if="history.twitter" :href="history.twitter" target="_blank">
                  <img
                    class="icon"
                    :src="require(`~/assets/images/icons/icon-twitter.png`)"
                    alt="Twitter"
                  />
                </a>
                <a v-if="history.youtube" :href="history.youtube" target="_blank">
                  <img
                    class="icon"
                    :src="require(`~/assets/images/icons/icon-youtube.png`)"
                    alt="Youtube"
                  />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
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
    const card = await $axios
      .$get("/api/card/detail", {
        params: {
          locale: app.i18n.locale,
          slug: route.params.slug,
        },
      })
      .catch((error) => {
        console.log(error.toJSON());
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
<style lang="scss" scoped></style>
