<template>
  <section>
    <div class="px-6 py-3 merch-detail-container">
      <a-tabs type="card" class="custom-card-tab">
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
        <table class="w-full general-table mb-4">
          <tbody>
            <tr v-if="merch.name">
              <th>{{ $t("MERCH.PRODUCT-NAME") }}</th>
              <td>{{ merch.name }}</td>
            </tr>
            <tr v-if="merch.series">
              <th>{{ $t("MERCH.PRODUCT-SERIES") }}</th>
              <td>{{ merch.series.name }}</td>
            </tr>
            <tr v-if="merch.price">
              <th>{{ $t("MERCH.PRICE") }}</th>
              <td>¥{{ merch.price }}</td>
            </tr>
            <template v-if="merch.sell_date_ranges.length > 0">
              <tr>
                <th :rowspan="merch.sell_date_ranges.length">
                  {{ $t("MERCH.SELL-TIME") }}
                </th>
                <td>
                  <NuxtLink
                    :to="
                      localePath(
                        `/merches/sell-dates/${merch.sell_date_ranges[0].start}`
                      )
                    "
                    class="active-link"
                    >{{ merch.sell_date_ranges[0].value }}</NuxtLink
                  >
                  <a
                    class="inline-block"
                    v-if="merch.sell_date_ranges[0].url"
                    :href="merch.sell_date_ranges[0].url"
                    target="_blank"
                  >
                    <img
                      class="icon"
                      :src="require(`~/assets/images/icons/icon-weibo.png`)"
                      :alt="`${merch.name}-新浪微博`"
                    />
                  </a>
                </td>
              </tr>
              <template v-for="(t, i) in merch.sell_date_ranges">
                <tr :key="i" v-if="i > 0">
                  <td>
                    <NuxtLink
                      :to="
                        localePath(
                          `/merches/sell-dates/${t.start}`
                        )
                      "
                      class="active-link"
                    >
                      {{ t.value }}
                    </NuxtLink>
                    <a class="inline-block" v-if="t.url" :href="t.url" target="_blank">
                      <img
                        class="icon"
                        :src="require(`~/assets/images/icons/icon-weibo.png`)"
                        :alt="`${merch.name}-新浪微博`"
                      />
                    </a>
                  </td>
                </tr>
              </template>
            </template>
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
            <tr v-if="merch.tmall && merch.tmall !== '-'">
              <th>{{ $t("MERCH.PURCHASE-LINK") }}</th>
              <td>
                <a :href="merch.tmall" target="_blank">
                  <img
                    class="icon tmall"
                    :src="require(`~/assets/images/icons/icon-tmall.png`)"
                    :alt="`${merch.name}-天猫商城`"
                  />
                </a>
              </td>
            </tr>
            <tr v-if="merch.weibo">
              <th>{{ $t("COMMON.REFERENCE") }}</th>
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
        <div v-if="merch.description">
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
    return {
      merch,
    };
  },
  data() {
    return {
      showProductDescription: false,
    };
  },
  head() {
    return {
      title: `${this.$t("NAV.MERCH-LIST")}: ${this.merch.name} | ${this.$t(
        "COMMON.TITLE-POSTFIX"
      )}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.$t("NAV.MERCH-LIST")}: ${
            this.merch.name
          } | ${this.$t("COMMON.TITLE-POSTFIX")}`,
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
  .general-table {
    th,
    td {
      text-align: left;
    }
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
.tmall{
  filter: invert(100%);
}
@media all and (max-width: $lg) {
  .merch-detail-container {
    grid-template-columns: 1fr;
  }
}
</style>
