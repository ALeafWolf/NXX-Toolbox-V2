<template>
    <section
      class="desktop-sidebar p-4 base-panel hide"
    >
      <NuxtLink to="/" @click="store.closeMobileMenu()"><h2>Home</h2></NuxtLink>
      <NuxtLink to="/calculator/resource" @click="store.closeMobileMenu()"><h2>Resource Calculator</h2></NuxtLink>
      <NuxtLink to="/cards" @click="store.closeMobileMenu()"><h2>Cards</h2></NuxtLink>
      <NuxtLink to="/skills" @click="store.closeMobileMenu()"><h2>Skills</h2></NuxtLink>
      <NuxtLink to="/contact" @click="store.closeMobileMenu()"><h2>Contact</h2></NuxtLink>
    </section>
  </template>
  <style lang="scss">
  .desktop-sidebar {
    display: block;
    position: absolute;
    top: $float-space;
    bottom: $float-space;
    left: $float-space;
    z-index: 3;
    outline: 0;
    box-sizing: border-box;
    overflow-y: auto;
    width: calc($sidebar-width - $float-space);
  }
  @media all and (max-width: $lg) {
    .desktop-sidebar {
      width: calc($sidebar-width-mobile - $float-space);
    }
  }
  @media all and (max-width: $md) {
    .desktop-sidebar {
      width: auto;
      top: 0;
      bottom: 0;
      right: $float-space;
      background-color: rgba(0, 0, 0, 0.6);
      &.hide {
        display: none;
      }
    }
  }
  @media all and (max-width: $sm) {
    .desktop-sidebar {
      left: 0;
      right: 0;
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
//   });
  </script>
  