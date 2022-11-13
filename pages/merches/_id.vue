<template>
  <section>
    <div class="sub-panel px-6 py-3 merch-detail-container">
      <a-tabs type="card">
        <a-tab-pane class="tab-content" key="`image-1`" tab="1">
          <img
            class="img-fluid"
            :src="merch.avatar.url"
            :alt="`${merch.name}-1`"
          />
        </a-tab-pane>
        <a-tab-pane
          class="tab-content"
          v-for="(image, i) in merch.images"
          :key="`image-${i + 2}`"
          :tab="i + 2"
        >
          <img
            class="img-fluid"
            :src="image.url"
            :alt="`${merch.name}-${i + 2}`"
          />
        </a-tab-pane>
      </a-tabs>
      <div class="merch-detail-content">
        <table class="w-full">
          <tbody>
            <tr>
              <th>{{ $t("MERCH.PRODUCT-NAME") }}</th>
              <td>{{ merch.name }}</td>
            </tr>
            <tr>
              <th>{{ $t("MERCH.PRODUCT-SERIES") }}</th>
              <td>{{ merch.series.name }}</td>
            </tr>
            <tr>
              <th>{{ $t("MERCH.PRICE") }}</th>
              <td>¥{{ merch.price }}</td>
            </tr>
            <tr>
              <th>{{ $t("MERCH.SELL-TIME") }}</th>
              <td>
                <span v-for="(d, i) in sellTimes" :key="i">{{ d }}</span>
              </td>
            </tr>
            <tr v-if="merch.materials.length > 0">
              <th>{{ $t("MERCH.PRODUCT-MATERIAL") }}</th>
              <td>
                <span
                  class="tag py-1 px-2"
                  v-for="(m, i) in merch.materials"
                  :key="i"
                  >{{ m.value }}</span
                >
              </td>
            </tr>
            <tr v-if="merch.technologies.length > 0">
              <th>{{ $t("MERCH.PRODUCT-TECHNOLOGY") }}</th>
              <td>
                <span
                  class="tag py-1 px-2"
                  v-for="(t, i) in merch.technologies"
                  :key="i"
                  >{{ t.value }}</span
                >
              </td>
            </tr>
            <tr v-if="merch.packagings.length > 0">
              <th>{{ $t("MERCH.PRODUCT-PACKAGING") }}</th>
              <td>
                <span
                  class="tag py-1 px-2"
                  v-for="(p, i) in merch.packagings"
                  :key="i"
                  >{{ p.value }}</span
                >
              </td>
            </tr>
            <tr v-if="merch.tmall">
              <th>{{ $t("MERCH.PURCHASE-LINK") }}</th>
              <td>
                <a :href="merch.tmall" target="_blank">
                  <img
                    class="icon"
                    :src="require(`~/assets/images/icons/icon-tmall.png`)"
                    :alt="`${merch.name}-天猫商城`"
                  />
                </a>
              </td>
            </tr>
            <tr v-if="merch.weibo">
              <th>{{ $t("MERCH.REFERENCE") }}</th>
              <td>
                <a :href="merch.weibo" target="_blank">
                  <img
                    class="icon"
                    :src="require(`~/assets/images/icons/icon-weibo.png`)"
                    :alt="`${merch.name}-新浪微博`"
                  />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="merch.description" class="px-2">
          <button
            class="w-full py-2 merch-des-btn text-base"
            @click="showProductDescription = !showProductDescription"
          >
            <span v-if="showProductDescription"
              >{{ $t("MERCH.HIDE-DESCRIPTION") }} ▲</span
            >
            <span v-else>{{ $t("MERCH.SHOW-DESCRIPTION") }} ▼</span>
          </button>
          <div
            class="p-2 description"
            v-if="showProductDescription"
            v-html="merch.description"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ $axios, route }) {
    const merch = await $axios
      .$get(`/api/merch/${route.params.id}`)
      .catch((error) => {
        console.log(error.toJSON());
      });

    const sellTimes = [];
    if (merch.sell_date_index[0] === -1 && merch.sell_date_index.length === 1) {
      sellTimes = merch.series.sell_times;
    } else {
      for (let i = 0; i < merch.sell_date_index.length; i++) {
        const index = merch.sell_date_index[i];
        sellTimes.push(merch.series.sell_times[index]);
      }
    }
    return {
      merch,
      sellTimes,
    };
  },
  data() {
    return {
      showProductDescription: false,
    };
  },
  head() {
    return {
      title: `官方周边列表 | 牛叉叉牌工具箱`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `官方周边列表 | 牛叉叉牌工具箱`,
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.merch-detail-container {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 60px;
  .tab-content {
    background-color: rgba(0, 0, 0, 0.5);
  }
}
.merch-detail-content {
  table th,
  table td {
    padding: 5px 0.5rem;
  }
  .tag {
    background-color: rgba(76, 76, 133, 1);
    display: inline-block;
    border-radius: 8px;
  }
  .tag:not(:last-child) {
    margin-right: 5px;
  }
}
.merch-des-btn {
  background: rgba(76, 76, 133, 1);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.description {
  background-color: rgba(0, 0, 0, 0.1);
}
@media all and (max-width: $lg) {
  .merch-detail-container {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
<style lang="scss">
.merch-detail-content {
  h2 {
    font-size: 18px;
    font-weight: 500;
  }
}
.merch-detail-container {
  .ant-tabs-bar {
    border: none;
    border-top: 1px solid rgb(62, 62, 62);
    border-bottom: 1px solid rgb(62, 62, 62);
  }
  .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
    background-color: rgba(35, 38, 50, 0.5);
    border: none;
  }
  .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
    border-bottom: 2px solid #fff;
    background: linear-gradient(
      rgba(60, 64, 77, 0.75) 0%,
      rgba(76, 76, 133, 1) 100%
    );
  }
}
</style>
