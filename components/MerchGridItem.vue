<template>
  <div class="sub-panel p-3 max-h-[220px]">
    <NuxtLink :to="localePath(`/merches/${merch.id}`)" _target="_blank">
      <img
        class="large-icon m-auto mb-2"
        :src="merch.avatar.url"
        :alt="merch.name"
        lazy
      />
    </NuxtLink>
    <div class="flex justify-center">
      <h5>{{ merch.name }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "MerchGridItem",
  props: {
    merch: Object
  }
};
</script>
