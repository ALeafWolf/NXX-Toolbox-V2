<template>
  <div class="sub-panel p-3 flex flex-col justify-center card-grid-item">
    <NuxtLink
      v-if="url"
      class="mx-auto inline-block mb-2"
      :to="localePath(url)"
    >
      <img
        class="large-icon"
        :src="card.thumbnail.url"
        :alt="card[`name${$globalV.getLocalePostfix($i18n.locale)}`]"
      />
    </NuxtLink>
    <div
      class="flex justify-center cursor-pointer"
      v-if="onClick"
      @click="onClick(card.id)"
    >
      <img
        class="large-icon"
        :src="card.thumbnail.url"
        :alt="card[`name${$globalV.getLocalePostfix($i18n.locale)}`]"
      />
    </div>
    <div class="flex justify-center">
      <img
        class="icon mr-1"
        :src="require(`~/assets/images/${card.attribute}.png`)"
        :alt="card.attribute"
      />
      <h5>
        {{ card[`name${$globalV.getLocalePostfix($i18n.locale)}`] }}
      </h5>
    </div>
    <div class="flex justify-center">
      <span v-for="(skill, i) in card.skills" :key="i">
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
            class="icon"
            :src="skill.skill_group.icon.url"
            :alt="skill[`name${$globalV.getLocalePostfix($i18n.locale)}`]"
          />
        </NuxtLink>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardGridItem",
  props: {
    card: {
      type: Object,
      default: {},
    },
    url: {
      type: String,
    },
    onClick: Function,
  },
};
</script>

<style lang="scss" scoped>
.card-grid-item {
  height: 200px;
}
</style>
