<template>
  <div class="main-container">
      <img class="nxx-logo" src="~/assets/images/nxx-logo.png" />
      <NavBar />
      <div class="content-container custom-scrollbar">
        <SideBar />
        <div class="content base-panel">
          <Nuxt />
        </div>
      </div>
      <Footer />
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
  }
  .nxx-logo {
    position: absolute;
    width: 150px;
    height: 150px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .content-container {
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    display: block;
    height: calc(100vh - $nav-height - $footer-height);
    overflow: hidden;
    width: 100%;
    padding: $float-space;
  }
  .content {
    margin-left: $sidebar-width;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    padding: 30px;
    position: relative;
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
  }
  @media all and (max-width: $sm) {
    .content-container{
      padding: $float-space 0;
    }
  }
  </style>
  