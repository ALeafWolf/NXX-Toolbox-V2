<template>
  <table class="w-full general-table">
    <thead>
      <tr>
        <th @click="toggleSortHeader('start')">
          <div class="table-sort-header">
            {{ $t("CARD-ACQUISITION.START") }}
            <a-icon :type="`caret-${startDateDesc ? 'down' : 'up'}`" />
          </div>
        </th>
        <th @click="toggleSortHeader('end')">
          <div class="table-sort-header">
            {{ $t("CARD-ACQUISITION.END") }}
            <a-icon :type="`caret-${endDateDesc ? 'down' : 'up'}`" />
          </div>
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
            `${$t(`COMMON.${record.type}`)}: ${$t(`COMMON.${record.subtype}`)}`
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
            <a v-if="record.video_url" :href="record.video_url" target="_blank">
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
</template>

<script>
export default {
  name: "AcquisitionTable",
  props: {
    entries: { type: Array },
    startDateDesc: { type: Boolean },
    endDateDesc: { type: Boolean },
    toggleSortHeader: { type: Function },
    locale: { type: String },
  },
};
</script>

<style lang="scss" scoped>
.table-sort-header {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
