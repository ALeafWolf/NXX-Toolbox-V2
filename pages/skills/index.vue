<template>
  <section>
    <div class="wrapper">
      <h1 class="text-xl">Skills</h1>
      <div class="filter-wrapper flex">
        <div class="mr-6">
          <h3 class="text-blue-600 text-lg">Slot</h3>
          <div v-for="(slot, i) in filterOptions.slot" :key="i">
            <input
              type="checkbox"
              :name="slot"
              :value="slot"
              v-model="filters.slot"
              @change="filterSkills"
            />
            <label :for="slot">{{ slot }}</label>
          </div>
        </div>
        <div class="mr-6">
          <h3 class="text-blue-600 text-lg">Character</h3>
          <div v-for="(char, i) in filterOptions.character" :key="i">
            <input
              type="checkbox"
              :name="char"
              :value="i + 1"
              v-model="filters.character"
              @change="filterSkills"
            />
            <label :for="char">{{ char }}</label>
          </div>
        </div>
        <div class="mr-6">
          <h3 class="text-blue-600 text-lg">Attribute</h3>
          <div v-for="(a, i) in filterOptions.attribute" :key="i">
            <input
              type="checkbox"
              :name="a"
              :value="i + 1"
              v-model="filters.attribute"
              @change="filterSkills"
            />
            <label for="a">{{ a }}</label>
          </div>
        </div>
      </div>
      <table class="w-full text-center sub-panel">
        <thead>
          <tr>
            <th rowspan="2">Icon</th>
            <th rowspan="2">Name</th>
            <th rowspan="2">Description</th>
            <th colspan="2">Numbers</th>
          </tr>
          <tr>
            <th>Lv 1</th>
            <th>Lv 10</th>
          </tr>
        </thead>
        <tbody v-for="(group, i) in skillGroups" :key="i">
          <tr v-for="(skill, j) in group.skills" :key="j">
            <td v-if="j === 0" :rowspan="group.skills.length">
              <NuxtLink :to="`/skills/${skill.slug}`">
                <img
                  :src="`${imgUrl}/技能/${group.img_ref}.webp`"
                  :alt="skill.name"
              /></NuxtLink>
            </td>
            <td>
              <NuxtLink :to="`/skills/${skill.slug}`">
                {{ skill.name }}</NuxtLink
              >
            </td>
            <td>
              {{ $globalV.getDesWithRound(group.description, skill.variant) }}
            </td>
            <td>{{ skill.number.lv1 }}</td>
            <td>{{ skill.number.lv10 }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: this.$globalV.ihs,
      filterOptions: {
        slot: [1, 2, 3],
        character: ["GENERAL", "LUKE", "ARTEM", "VYN", "MARIUS"],
        attribute: ["GENERAL", "LOGIC", "EMPATHY", "INTUITION"],
      },
      filters: {
        slot: [],
        character: [],
        attribute: [],
      },
    };
  },
  async asyncData({ $axios, app }) {
    const skillGroups = await $axios
      .$get("/api/skill-groups", {
        params: {
          locale: app.i18n.locale,
        },
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
    return {
      skillGroups,
    };
  },
  head() {
    return {
      title: `技能 | 牛叉叉牌工具箱`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `技能 | 牛叉叉牌工具箱`,
        },
      ],
    };
  },
  methods: {
    getFilters() {
      const f = {};
      if (this.filters.slot.length > 0) {
        f.slot = {
          $in: this.filters.slot,
        };
      }
      if (this.filters.character.length > 0) {
        f.character = {
          id: {
            $in: this.filters.character,
          },
        };
      }
      if (this.filters.attribute.length > 0) {
        f.attribute = {
          id: {
            $in: this.filters.attribute,
          },
        };
      }
      return f;
    },
    async filterSkills() {
      const f = this.getFilters();
      this.skillGroups = await this.$axios
        .$get("/api/skill-groups", {
          params: {
            locale: "zh",
            filters: f,
            sort: ["slot"],
          },
        })
        .catch((error) => {
          console.log(error.toJSON());
        });
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  display: flex;
  justify-content: center;
}
</style>
