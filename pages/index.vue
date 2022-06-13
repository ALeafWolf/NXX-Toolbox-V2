<template>
  <Tutorial />
</template>

<script>
import skillsQuery from "~/apollo/queries/skills";


export default {
  data() {
    return {
      skills: {
        data: []
      }
    };
  },
  apollo: {
    skills: {
      prefetch: true,
      query: skillsQuery,
    },
  },
};
</script>
