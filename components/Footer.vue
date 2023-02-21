<template>
  <footer class="base-panel px-4 py-2">
    <div class="flex gap-2 items-center">
      <NuxtLink :to="localePath('/about')">
        <h6>{{ $t('NAV.ABOUT') }}</h6>
      </NuxtLink>
      <NuxtLink :to="localePath('/contact')">
        <h6>{{ $t('NAV.CONTACT') }}</h6>
      </NuxtLink>
      <NuxtLink :to="localePath('/update-logs')">
        <h6>{{ $t('NAV.UPDATE-LOG') }}</h6>
      </NuxtLink>
    </div>
    <h5>ALeafWolf {{ getCurrentYear() }}</h5>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  methods: {
    getCurrentYear(){
      return new Date().getFullYear();
    }
  }
}
</script>

<style lang="scss" scoped>
footer {
  height: $footer-height;
  width: calc(100% - $float-space * 2);
  display: grid;
  justify-items: center;
  margin: 0 $float-space;
}
@media all and (max-width: $sm) {
  footer {
    margin: 0;
    width: 100%;
  }
}
</style>
