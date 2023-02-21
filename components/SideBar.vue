<template>
  <section
    class="desktop-sidebar p-4 base-panel"
    :class="{ hide: !$store.state.mobileMenu }"
  >
    <!-- <NuxtLink :to="localePath('/')" @click="closeMobileMenu">
      {{ $t("NAV.HOME") }}
    </NuxtLink> -->
    <NuxtLink :to="localePath('/calculator/resource')" @click="closeMobileMenu">
      {{ $t("NAV.CARD-RSS-CALC") }}
    </NuxtLink>
    <NuxtLink :to="localePath('/calculator/power')" @click="closeMobileMenu">
      {{ $t("NAV.CARD-POWER-CALC") }}
    </NuxtLink>
    <NuxtLink :to="localePath('/cards')" @click="closeMobileMenu">
      {{ $t("NAV.CARD-LIST") }}
    </NuxtLink>
    <NuxtLink :to="localePath('/card-acquisition')" @click="closeMobileMenu">
      {{ $t("NAV.CARD-ACQUISITION") }}
    </NuxtLink>
    <NuxtLink :to="localePath('/skills')" @click="closeMobileMenu">
      {{ $t("NAV.SKILL-LIST") }}
    </NuxtLink>
    <NuxtLink :to="localePath('/merches')" @click="closeMobileMenu">
      {{ $t("NAV.MERCH-LIST") }}
    </NuxtLink>
  </section>
</template>

<script>
export default {
  data() {
    return {
      mobileMenu: this.$store.state.mobileMenu,
    };
  },
  methods: {
    closeMobileMenu() {
      this.$store.commit("closeMobileMenu");
    },
  },
};
</script>

<style lang="scss" scoped>
.desktop-sidebar {
  display: block;
  position: absolute;
  top: $float-space;
  bottom: $float-space;
  left: $float-space;
  z-index: 3;
  outline: 0;
  box-sizing: border-box;
  overflow-y: auto;
  width: calc($sidebar-width - $float-space);
  a{
    display: block;
    padding: 5px;
  }
  a:hover, a.nuxt-link-active {
    background-color: rgba(0, 0, 0, 0.8);
  }
}
@media all and (max-width: $lg) {
  .desktop-sidebar {
    width: calc($sidebar-width-mobile - $float-space);
  }
}
@media all and (max-width: $md) {
  .desktop-sidebar {
    width: auto;
    top: 0;
    bottom: 0;
    right: $float-space;
    background-color: rgba(0, 0, 0, 0.6);
    &.hide {
      display: none;
    }
  }
}
@media all and (max-width: $sm) {
  .desktop-sidebar {
    left: 0;
    right: 0;
  }
}
</style>
