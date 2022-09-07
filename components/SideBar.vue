<template>
  <section
    class="desktop-sidebar p-4 base-panel"
    :class="{ hide: !$store.state.mobileMenu }"
  >
    <NuxtLink :to="localePath('/')" @click="closeMobileMenu"><h2>{{$t('NAV.HOME')}}</h2></NuxtLink>
    <NuxtLink :to="localePath('/calculator/resource')" @click="closeMobileMenu"
      ><h2>{{$t('NAV.CARD-RSS-CALC')}}</h2></NuxtLink
    >
    <NuxtLink :to="localePath('/cards')" @click="closeMobileMenu"
      ><h2>{{$t('NAV.CARD-LIST')}}</h2></NuxtLink
    >
    <NuxtLink :to="localePath('/skills')" @click="closeMobileMenu"
      ><h2>{{$t('NAV.SKILL-LIST')}}</h2></NuxtLink
    >
    <NuxtLink :to="localePath('/contact')" @click="closeMobileMenu"
      ><h2>{{$t('NAV.CONTACT')}}</h2></NuxtLink
    >
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

<style lang="scss">
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
    background-color: rgba(0, 0, 0, 0.8);
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
