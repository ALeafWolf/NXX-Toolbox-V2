<template>
  <section>
    <h1 class="text-xl">Merchs</h1>
    <div class="card-grid w-full">
      <div v-for="(merch, i) in merches" class="sub-panel p-3" :key="i">
        <NuxtLink :to="`/merches/${merch.id}`">
          <img
            class="large-icon m-auto"
            :src="merch.avatar.url"
            :alt="merch.name"
          />
        </NuxtLink>
        <div class="flex justify-center">
          <h2>{{ merch.name }}</h2>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const merches = await $axios.$get("/api/merch/list").catch((error) => {
      console.log(error.toJSON());
    });
    return {
      merches,
    };
  },
  head() {
    return {
      title: `官方周边列表 | 牛叉叉牌工具箱`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `官方周边列表 | 牛叉叉牌工具箱`,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}
@media all and (max-width: $lg) {
  .card-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media all and (max-width: $md) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media all and (max-width: $sm) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
