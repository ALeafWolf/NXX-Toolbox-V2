<template>
    <nav class="base-panel px-4 py-2 flex justify-between">
      <!-- <NuxtLink to="/" @click="store.closeMobileMenu()"> -->
      <NuxtLink to="/" @click="store.closeMobileMenu()">
        <img
          class="logo img-fluid"
          src="~/assets/images/NXX-2.png"
          alt="NXX Toolbox"
        />
      </NuxtLink>
      <button class="nav-btn" @click="toggleMenu">Nav</button>
    </nav>
  </template>
  <style lang="scss" scoped>
  nav {
    width: calc(100% - $float-space * 2);
    height: $nav-height;
    display: flex;
    align-items: center;
    margin: 0 $float-space;
  }
  .nav-btn{
    display: none;
  }
  @media all and (max-width: $md) {
    .nav-btn{
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
  <script>
//   import { useStore } from "~/store/global";
  
//   export default defineComponent({
//     setup() {
//       const store = useStore();
  
//       return { store };
//     },
//     methods: {
//       toggleMenu() {
//         this.store.toggleMobileMenu();
//         console.log("Mobile Menu: " + this.store.mobileMenu)
//       },
//     },
//   });
  </script>
  