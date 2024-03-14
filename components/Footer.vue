<template>
  <footer id="siteFooter" class="base-panel p-4">
    <div class="mb-2">
      <a href="https://github.com/ALeafWolf/NXX-Toolbox-V2" target="_blank">
        <a-icon type="github" :style="{ fontSize: '30px' }" />
      </a>
      <!-- <a
        href="https://qm.qq.com/cgi-bin/qm/qr?k=y9E7R0m6F7CxDVZObagh5FYxYqeeQLZx&jump_from=webapi&authKey=0A5oqVcJ2SmLfhO3sTCkdlm2Yg5SGnZvzVGoQ2hpUNVEmM3PDQ2qxyG+NX3zTZEg"
        target="_blank"
      >
        <a-icon type="qq" :style="{ fontSize: '30px' }" />
      </a> -->
    </div>
    <div class="flex gap-2 items-center">
      <!-- <NuxtLink :to="localePath('/about')">
        <h6>{{ $t("NAV.ABOUT") }}</h6>
      </NuxtLink> -->
      <NuxtLink :to="localePath('/contact')">
        <h6>{{ $t("NAV.CONTACT") }}</h6>
      </NuxtLink>
      <NuxtLink :to="localePath('/update-logs')">
        <h6>{{ $t("NAV.UPDATE-LOG") }}</h6>
      </NuxtLink>
    </div>
    <h5>ALeafWolf © {{ getCurrentYear() }}</h5>
    <!-- <a-radio-group v-model="$i18n.locale" @change="switchLanguage">
      <a-radio-button value="zh"> 中文 </a-radio-button>
      <a-radio-button value="en"> English </a-radio-button>
      <a-radio-button value="ko"> 한국인 </a-radio-button>
    </a-radio-group> -->
    <div class="locale-group" :class="$i18n.locale">
      <NuxtLink class="locale-btn zh" :to="switchLocalePath('zh')">
        中文
      </NuxtLink>
      <NuxtLink class="locale-btn en" :to="switchLocalePath('en')">
        English
      </NuxtLink>
      <NuxtLink class="locale-btn ko" :to="switchLocalePath('ko')">
        한국인
      </NuxtLink>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  methods: {
    getCurrentYear() {
      return new Date().getFullYear();
    },
    switchLanguage(e) {
      this.switchLocalePath(e.target.value);
      // this.$i18n.setLocale(e.target.value);
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
.locale-group {
  display: flex;
  font-size: 14px;
  &.zh .locale-btn.zh, &.en .locale-btn.en, &.ko .locale-btn.ko {
    border-color: #756dcc;
  }
  .locale-btn {
    padding: 4px 16px;
    border: 1px solid #fff;
    color: #fff;
    background-color: #00000080;
    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
}
@media all and (max-width: $md) {
  #siteFooter {
    margin: 0;
    width: 100%;
  }
}
</style>
