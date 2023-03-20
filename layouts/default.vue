<template>
  <div class="main-container">
    <div v-if="deferredPrompt" class="pwa-prompt base-panel">
      <img src="/icon.png" alt="app icon" />
      <div>
        <h5 class="text-center">{{ $t("COMMON.PWA-MESSAGE") }}</h5>
        <div class="flex justify-between">
          <a-button @click="install">{{ $t("COMMON.INSTALL") }}</a-button>
          <a-button @click="dismiss">{{ $t("COMMON.DISMISS") }}</a-button>
        </div>
      </div>
    </div>
    <img class="nxx-logo" src="~/assets/images/nxx-logo.png" />
    <NavBar />
    <div class="component-container custom-scrollbar">
      <SideBar />
      <div id="contentContainer" class="content-container">
        <div class="content">
          <div class="page base-panel">
            <Nuxt />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  watch: {
    $route(to, from) {
      window.setTimeout(() => {
        document.getElementById("contentContainer").scrollTo(0, 0);
      }, 100);
    },
  },
  data() {
    return {
      deferredPrompt: null,
    };
  },
  mounted() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
    });
    window.addEventListener("appinstalled", () => {
      this.deferredPrompt = null;
    });
  },
  methods: {
    async dismiss() {
      this.deferredPrompt = null;
    },
    async install() {
      this.deferredPrompt.prompt();
    },
  },
};
</script>
<style lang="scss" scoped>
.pwa-prompt {
  position: fixed;
  height: 200px;
  max-width: 500px;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: 100px auto;
  gap: 20px;
  align-items: center;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.9);
}
.main-container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  background: linear-gradient(rgb(13, 13, 18), rgb(54, 52, 70));
  display: grid;
  row-gap: $float-space;
}
.nxx-logo {
  position: absolute;
  width: 150px;
  height: 150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.component-container {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: $sidebar-width auto;
  gap: $float-space;
  max-height: calc(100vh - $nav-height);
  overflow: hidden;
  width: 100%;
  padding: 0 $float-space;
}
.content-container {
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
}
.content {
  height: calc(100vh - $nav-height);
  display: grid;
  gap: $float-space;
}
.page {
  padding: $float-space;
  // min-height: calc(100vh - 3 * $float-space - $footer-height - $nav-height);
}
@media all and (max-width: $lg) {
  .page {
    padding: $float-space;
  }
  .component-container {
    grid-template-columns: $sidebar-width-mobile auto;
  }
}
@media all and (max-width: $md) {
  .component-container {
    padding: 0;
  }
  .component-container {
    display: block;
  }
  .content-container {
    height: 100%;
  }
  .pwa-prompt{
    grid-template-columns: 50px auto;
  }
}
</style>
