<template>
  <div
    id="sideNavbar"
    class="p-4 base-panel"
    :class="{ hide: !$store.state.mobileMenu }"
  >
    <section>
      <!-- <NuxtLink :to="localePath('/')" @click="closeMobileMenu">
      {{ $t("NAV.HOME") }}
    </NuxtLink> -->
      <NuxtLink
        :to="localePath('/calculator/resource')"
        @click="closeMobileMenu"
      >
        <h6>
          {{ $t("NAV.CARD-RSS-CALC") }}
        </h6>
      </NuxtLink>
      <NuxtLink :to="localePath('/calculator/power')" @click="closeMobileMenu">
        <h6>
          {{ $t("NAV.CARD-POWER-CALC") }}
        </h6>
      </NuxtLink>
      <NuxtLink :to="localePath('/cards')" @click="closeMobileMenu">
        <h6>
          {{ $t("NAV.CARD-LIST") }}
        </h6>
      </NuxtLink>
      <NuxtLink :to="localePath('/card-acquisition')" @click="closeMobileMenu">
        <h6>
          {{ $t("NAV.CARD-ACQUISITION") }}
        </h6>
      </NuxtLink>
      <NuxtLink :to="localePath('/skills')" @click="closeMobileMenu">
        <h6>
          {{ $t("NAV.SKILL-LIST") }}
        </h6>
      </NuxtLink>
      <NuxtLink :to="localePath('/merches')" @click="closeMobileMenu">
        <h6>
          {{ $t("NAV.MERCH-LIST") }}
        </h6>
      </NuxtLink>
    </section>

  </div>
</template>

<script>
export default {
  data() {
    return {
      mobileMenu: this.$store.state.mobileMenu,
      lang: "zh",
    };
  },
  methods: {
    closeMobileMenu() {
      this.$store.commit("closeMobileMenu");
      console.log("yay");
    },
    switchLanguage(e) {
      this.$i18n.setLocale(e.target.value);
    },
  },
};
</script>

<style lang="scss">
#sideNavbar {
  display: block;
  position: absolute;
  top: 0;
  bottom: $float-space;
  left: $float-space;
  z-index: 3;
  outline: 0;
  box-sizing: border-box;
  overflow-y: auto;
  width: calc($sidebar-width - $float-space);
  a {
    display: block;
    padding: 5px;
    color: #fff;
  }
  a:hover,
  a.nuxt-link-active {
    background-color: rgba(0, 0, 0, 0.8);
  }
}
@media all and (max-width: $lg) {
  #sideNavbar {
    width: calc($sidebar-width-mobile - $float-space);
  }
}
@media all and (max-width: $md) {
  #sideNavbar {
    position: fixed;
    width: 100%;
    top: $nav-height;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    &.hide {
      display: none;
    }
  }
}
@media all and (max-width: $sm) {
  #sideNavbar {
    left: 0;
    right: 0;
  }
}
</style>
