<template>
  <h1>{{$t('NAV.HOME')}}</h1>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
    };
  },
  head() {
    return {
      title: `${this.$t('NAV.HOME')} - ${this.$t('COMMON.TITLE-POSTFIX')}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t('COMMON.META-DESCRIPTION'),
        },
      ],
    };
  },
};
</script>
