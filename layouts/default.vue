<template>
  <div class="main-container">
    <img class="nxx-logo" src="~/assets/images/nxx-logo.png" />
    <NavBar />
    <div class="component-container custom-scrollbar">
      <SideBar />
      <div class="content-container">
        <div class="content">
          <div class="base-panel">
            <Nuxt />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>

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
  display: block;
  max-height: calc(100vh - $nav-height);
  overflow: hidden;
  width: 100%;
  padding: 0 $float-space;
}
.content-container {
  margin-left: $sidebar-width;
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100% - $float-space);
  position: relative;
}
.content {
  height: calc(100vh - $nav-height);
  display: grid;
  gap: $float-space;
}
@media all and (max-width: $lg) {
  .content {
    margin-left: $sidebar-width-mobile;
  }
}
@media all and (max-width: $md) {
  .content {
    margin-left: 0;
  }
  .component-container {
    padding: 25px 0;
  }
}
@media all and (max-width: $sm) {
  .content {
    padding: 15px;
  }
  .component-container {
    padding: $float-space 0;
  }
}
</style>
