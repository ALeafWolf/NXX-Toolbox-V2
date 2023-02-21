<template>

</template>

<script>
export default {
    name: 'AboutPage',
    head() {
    return {
      title: `${this.$t("NAV.ABOUT")} | ${this.$t("COMMON.TITLE-POSTFIX")}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t("COMMON.META-DESCRIPTION"),
        },
      ],
    };
  },
}
</script>