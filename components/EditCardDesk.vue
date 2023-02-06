<template>
  <div>
    <button @click="goBack">Back</button>
    <h1 class="text-center text-3xl">
      {{ $t(`COMMON.${card.character.name}`) }} -
      {{ card[`name${$globalV.getLocalePostfix($i18n.locale)}`] }}
    </h1>
    <div class="grid grid-cols-2 gap-4">
      <table class="general-table">
        <tr>
          <td rowspan="5">
            <img
              class="large-icon m-auto"
              :src="card.thumbnail.url"
              :alt="card[`name${$globalV.getLocalePostfix($i18n.locale)}`]"
            />
          </td>
          <th>{{ $t("COMMON.RANK") }}</th>
          <td>
            <a-select
              :default-value="1"
              dropdownClassName="custom-dropdown"
              @change="handleStarChange"
            >
              <a-select-option :value="1">1</a-select-option>
              <a-select-option :value="2">2</a-select-option>
              <a-select-option :value="3">3</a-select-option>
              <a-select-option :value="4">4</a-select-option>
              <a-select-option :value="5">5</a-select-option>
            </a-select>
          </td>
        </tr>
        <tr>
          <th>{{ $t("COMMON.LEVEL") }}</th>
          <td>100</td>
        </tr>
        <tr>
          <th>{{ $t("COMMON.RARITY") }}</th>
          <td>{{ card.rarity.value }}</td>
        </tr>
        <tr>
          <th>{{ $t("COMMON.INFLUENCE") }}</th>
          <td>{{ card.influence }}</td>
        </tr>
        <tr>
          <th>{{ $t("COMMON.DEFENSE") }}</th>
          <td>{{ card.defense }}</td>
        </tr>
      </table>
      <table class="general-table">
        <tbody v-for="(skill, i) in card.skills" :key="i">
          <tr>
            <th rowspan="2">
              <NuxtLink
                :to="
                  localePath(
                    `/skills/${$globalV.nameToSlug(
                      skill[`name${$globalV.getLocalePostfix($i18n.locale)}`]
                    )}`
                  )
                "
                target="_blank"
              >
                <img
                  class="large-icon"
                  :src="skill.skill_group.icon.url"
                  :alt="skill[`name${$globalV.getLocalePostfix($i18n.locale)}`]"
                />
              </NuxtLink>
            </th>
            <td>
              {{ skill[`name${$globalV.getLocalePostfix($i18n.locale)}`] }}
            </td>
            <td>
              <span>Lv</span>
              <a-select
                :default-value="1"
                dropdownClassName="custom-dropdown"
                @change="handleStarChange"
              >
                <a-select-option :value="1">1</a-select-option>
                <a-select-option :value="2">2</a-select-option>
                <a-select-option :value="3">3</a-select-option>
                <a-select-option :value="4">4</a-select-option>
                <a-select-option :value="5">5</a-select-option>
                <a-select-option :value="6">6</a-select-option>
                <a-select-option :value="7">7</a-select-option>
                <a-select-option :value="8">8</a-select-option>
                <a-select-option :value="9">9</a-select-option>
                <a-select-option :value="10">10</a-select-option>
              </a-select>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              {{
                skill.skill_group[
                  `description${$globalV.getLocalePostfix($i18n.locale)}`
                ]
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditCardDesk",
  props: {
    card: Object,
    goBack: Function,
    handleStarChange: Function,
  },
  computed: {},
};
</script>
