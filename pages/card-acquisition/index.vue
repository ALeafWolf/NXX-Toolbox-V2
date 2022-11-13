<template>
  <section>
    <table class="sub-panel w-full">
      <thead>
        <tr>
          <th>Start</th>
          <th>End</th>
          <th>Server</th>
          <th>Type</th>
          <th>Subtype</th>
          <th>Cards</th>
          <th>References</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, i) in acquisition" :key="i">
          <td>{{ record.start }}</td>
          <td>{{ record.end }}</td>
          <td>{{ record.server }}</td>
          <td>{{ record.type }}</td>
          <td>{{ $t(`COMMON.${record.subtype}`) }}</td>
          <td>
            <span
              class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-2"
            >
              <NuxtLink
                v-for="(card, j) in record.cards"
                :key="j"
                :to="localePath(`/cards/${card.slug}`)"
              >
                <img
                  class="large-icon"
                  :src="card.thumbnail.url"
                  :alt="card.name"
                />
              </NuxtLink>
            </span>
          </td>
          <td>
            <span class="flex">
              <a
                v-if="record.social_media_url"
                :href="record.social_media_url"
                target="_blank"
              >
                <img
                  class="icon"
                  :src="
                    require(`~/assets/images/icons/icon-${
                      record.server === 'CN' ? 'weibo' : 'twitter'
                    }.png`)
                  "
                  :alt="record.server === 'CN' ? 'weibo' : 'twitter'"
                />
              </a>
              <a
                v-if="record.video_url"
                :href="record.video_url"
                target="_blank"
              >
                <img
                  class="icon"
                  :src="
                    require(`~/assets/images/icons/icon-${
                      record.server === 'CN' ? 'bilibili' : 'youtube'
                    }.png`)
                  "
                  :alt="record.server === 'CN' ? 'bilibili' : 'youtube'"
                />
              </a>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  async asyncData({ $axios, app, route }) {
    const acquisition = await $axios
      .$get("/api/card-acquisition/list", {
        params: {
          locale: app.i18n.locale,
          slug: route.params.slug,
        },
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
    const index = [];
    for (let i = 0; i < acquisition.length; i++) {
      if (
        acquisition[i].start === "2020-07-30" &&
        acquisition[i].subtype === "PERMANENT-POOL"
      ) {
        index.push(i);
      }
    }
    acquisition.splice(index[0], 1);
    return {
      acquisition,
    };
  },
  head() {
    return {
      title: `思绪获取方式 | 牛叉叉牌工具箱`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `思绪获取方式 | 牛叉叉牌工具箱`,
        },
      ],
    };
  },
};
</script>
