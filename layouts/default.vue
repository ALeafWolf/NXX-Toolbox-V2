<template>
  <div class="main-container">
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
};
</script>
<style lang="scss" scoped>
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
}
</style>
