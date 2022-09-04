<template>
  <nav class="base-panel px-4 py-2 flex justify-between">
    <NuxtLink :to="localePath('/')" @click="closeMobileMenu">
      <img
        class="logo img-fluid"
        src="~/assets/images/NXX-2.png"
        alt="NXX Toolbox"
      />
    </NuxtLink>
    <div>
      <NuxtLink :to="switchLocalePath('zh')">ZH</NuxtLink>
      <NuxtLink :to="switchLocalePath('en')">EN</NuxtLink>
      <NuxtLink :to="switchLocalePath('ko')">KO</NuxtLink>
    </div>
    <button class="nav-btn" @click="toggleMobileMenu">Nav</button>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    toggleMobileMenu() {
      this.$store.commit("toggleMobileMenu");
    },
    closeMobileMenu() {
      this.$store.commit("closeMobileMenu");
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  width: calc(100% - $float-space * 2);
  height: $nav-height;
  display: flex;
  align-items: center;
  margin: 0 $float-space;
}
.nav-btn {
  display: none;
}
@media all and (max-width: $md) {
  .nav-btn {
    display: block;
  }
}
@media all and (max-width: $sm) {
  nav {
    margin: 0;
    width: 100%;
  }
  .logo {
    width: 70px;
  }
}
</style>
