<template>
  <h1>Skills</h1>
</template>

<script>
import skillsQuery from "~/apollo/queries/skills";
import gql from "graphql-tag";
const skills = gql`
  query ($locale: String!) {
    skills(locale: $locale) {
      data {
        id
        attributes {
          slug
          name
        }
      }
    }
  }
`;

export default {
  data() {
    return {
      skills: {
        data: [],
      },
      locale: this.$i18n.locale,
    };
  },
  apollo: {
    skills: {
      prefetch: true,
      query: skills,
      variables: {
        locale: 'zh'
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
