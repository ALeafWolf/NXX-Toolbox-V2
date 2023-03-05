<template>
  <section class="acquisition-table-container">
    <table class="w-full general-table">
      <thead>
        <tr>
          <th v-if="toggleSortHeader" @click="toggleSortHeader('start')">
            <div class="table-sort-header">
              {{ $t("CARD-ACQUISITION.START") }}
              <a-icon :type="`caret-${startDateDesc ? 'down' : 'up'}`" />
            </div>
          </th>
          <th v-else>
            {{ $t("CARD-ACQUISITION.START") }}
          </th>
          <th v-if="toggleSortHeader" @click="toggleSortHeader('end')">
            <div class="table-sort-header">
              {{ $t("CARD-ACQUISITION.END") }}
              <a-icon :type="`caret-${endDateDesc ? 'down' : 'up'}`" />
            </div>
          </th>
          <th v-else>
            {{ $t("CARD-ACQUISITION.END") }}
          </th>
          <th>{{ $t("COMMON.SERVER") }}</th>
          <th>{{ $t("CARD-ACQUISITION.TYPE") }}</th>
          <th>{{ $t("COMMON.CARDS") }}</th>
          <th>{{ $t("COMMON.REFERENCE") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, i) in entries" :key="i">
          <td>{{ record.start }}</td>
          <td>{{ record.end }}</td>
          <td>{{ $t(`COMMON.${record.server}`) }}</td>
          <td>
            {{
              `${$t(`COMMON.${record.type}`)}: ${$t(
                `COMMON.${record.subtype}`
              )}`
            }}
          </td>
          <td>
            <span
              class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-2"
            >
              <NuxtLink
                v-for="(card, j) in record.cards"
                :key="j"
                :to="
                  localePath(
                    `/cards/${$globalV.nameToSlug(
                      card[`name${$globalV.getLocalePostfix(locale)}`]
                    )}`
                  )
                "
              >
                <img
                  class="large-icon"
                  :src="card.thumbnail.url"
                  :alt="card[`name${$globalV.getLocalePostfix(locale)}`]"
                  lazy
                />
              </NuxtLink>
            </span>
          </td>
          <td>
            <span class="flex justify-center">
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
                  lazy
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
                  lazy
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
  name: "AcquisitionTable",
  props: {
    entries: Array,
    startDateDesc: Boolean,
    endDateDesc: Boolean,
    toggleSortHeader: Function,
    locale: String,
  },
};
</script>

<style lang="scss" scoped>
.table-sort-header {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media all and (max-width: $lg) {
  .general-table {
    min-width: 650px;
  }
  .acquisition-table-container {
    overflow-x: auto;
    width: calc(100vw - 3 * $float-space - $sidebar-width);
  }
}
@media all and (max-width: $md) {
  .large-icon {
    max-width: 60px;
    max-height: 60px;
  }
  .acquisition-table-container {
    overflow-x: auto;
    width: calc(100vw - 3 * $float-space);
  }
}
</style>
