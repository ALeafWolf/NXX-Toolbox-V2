<template>
  <footer id="siteFooter" class="base-panel px-4 py-2">
    <div class="grid grid-cols-2 gap-2 mb-2">
      <a href="https://github.com/ALeafWolf/NXX-Toolbox-V2" target="_blank">
        <a-icon type="github" :style="{ fontSize: '30px' }" />
      </a>
      <a
        href="https://qm.qq.com/cgi-bin/qm/qr?k=y9E7R0m6F7CxDVZObagh5FYxYqeeQLZx&jump_from=webapi&authKey=0A5oqVcJ2SmLfhO3sTCkdlm2Yg5SGnZvzVGoQ2hpUNVEmM3PDQ2qxyG+NX3zTZEg"
        target="_blank"
      >
        <a-icon type="qq" :style="{ fontSize: '30px' }" />
      </a>
    </div>
    <div class="flex gap-2 items-center">
      <NuxtLink :to="localePath('/about')">
        <h6>{{ $t("NAV.ABOUT") }}</h6>
      </NuxtLink>
      <NuxtLink :to="localePath('/contact')">
        <h6>{{ $t("NAV.CONTACT") }}</h6>
      </NuxtLink>
      <NuxtLink :to="localePath('/update-logs')">
        <h6>{{ $t("NAV.UPDATE-LOG") }}</h6>
      </NuxtLink>
    </div>
    <h5>ALeafWolf {{ getCurrentYear() }}</h5>
    <a-radio-group v-model="lang" @change="switchLanguage">
      <a-radio-button value="zh"> 中文 </a-radio-button>
      <a-radio-button value="en"> English </a-radio-button>
      <a-radio-button value="ko"> 한국인 </a-radio-button>
    </a-radio-group>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      lang: "zh",
    };
  },
  methods: {
    getCurrentYear() {
      return new Date().getFullYear();
    },
    switchLanguage(e) {
      this.$i18n.setLocale(e.target.value);
    },
  },
};
</script>

<style lang="scss">
#siteFooter {
  height: $footer-height;
  display: grid;
  justify-items: center;
}
@media all and (max-width: $md) {
  #siteFooter {
    margin: 0;
    width: 100%;
  }
}
</style>
