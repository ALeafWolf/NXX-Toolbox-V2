<template>
  <section>
    <div>
      <div class="filter-wrapper">
        <div>
          <h3>{{ $t("COMMON.SKILL-SLOT") }}</h3>
          <a-select
            mode="multiple"
            class="w-full custom-select"
            placeholder="Slot"
            dropdownClassName="custom-dropdown"
            :defaultValue="[]"
            @change="handleSlotChange"
          >
            <a-select-option v-for="slot in filterOptions.slot" :key="slot">
              {{ slot }}
            </a-select-option>
          </a-select>
        </div>
        <div>
          <h3>{{ $t("COMMON.CHARACTER") }}</h3>
          <a-select
            mode="multiple"
            class="w-full custom-select"
            placeholder="Character"
            :defaultValue="[]"
            dropdownClassName="custom-dropdown"
            @change="handleCharChange"
          >
            <a-select-option
              v-for="(char, i) in filterOptions.character"
              :key="i + 1"
            >
              {{ $t(`COMMON.${char}`) }}
            </a-select-option>
          </a-select>
        </div>
        <div>
          <h3>{{ $t("COMMON.ATTRIBUTE") }}</h3>
          <a-select
            mode="multiple"
            class="w-full custom-select"
            placeholder="Attribute"
            :defaultValue="[]"
            dropdownClassName="custom-dropdown"
            @change="handleAttrChange"
          >
            <a-select-option
              v-for="(a, i) in filterOptions.attribute"
              :key="i + 1"
            >
              {{ $t(`COMMON.${a}`) }}
            </a-select-option>
          </a-select>
        </div>
      </div>
      <section class="skill-table-container">
        <table class="w-full text-center general-table">
          <thead>
            <tr>
              <th rowspan="2">{{ $t("COMMON.ICON") }}</th>
              <th rowspan="2">Name</th>
              <th rowspan="2">Description</th>
              <th colspan="2">{{ $t("COMMON.NUMBER") }}</th>
            </tr>
            <tr>
              <th>Lv 1</th>
              <th>Lv 10</th>
            </tr>
          </thead>
          <tbody v-for="(group, i) in currentSkillGroups" :key="i">
            <tr v-for="(skill, j) in group.skills" :key="j">
              <td v-if="j === 0" :rowspan="group.skills.length">
                <NuxtLink
                  :to="
                    localePath(
                      `/skills/${$globalV.nameToSlug(
                        skill[`name${$globalV.getLocalePostfix($i18n.locale)}`]
                      )}`
                    )
                  "
                >
                  <img
                    class="mx-auto"
                    :src="group.icon.url"
                    :alt="
                      skill[`name${$globalV.getLocalePostfix($i18n.locale)}`]
                    "
                    lazy
                  />
                </NuxtLink>
              </td>
              <td>
                <NuxtLink
                  class="active-link"
                  :to="
                    localePath(
                      `/skills/${$globalV.nameToSlug(
                        skill[`name${$globalV.getLocalePostfix($i18n.locale)}`]
                      )}`
                    )
                  "
                >
                  {{
                    skill[`name${$globalV.getLocalePostfix($i18n.locale)}`]
                  }}</NuxtLink
                >
              </td>
              <td>
                {{
                  $globalV.getDesWithRound(
                    group[
                      `description${$globalV.getLocalePostfix($i18n.locale)}`
                    ],
                    skill.variant
                  )
                }}
              </td>
              <td>{{ skill.number.lv1 }}</td>
              <td>{{ skill.number.lv10 }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
    <LoadingMask :isShow="isLoading" />
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
      isLoading: false,
    };
  },
  async asyncData({ $axios }) {
    const skillGroups = await $axios
      .$get("/api/skill-groups")
      .catch((error) => {
        console.log(error.toJSON());
      });

    return {
      skillGroups,
      currentSkillGroups: skillGroups,
    };
  },
  head() {
    return {
      title: `${this.$t("NAV.SKILL-LIST")} | ${this.$t(
        "COMMON.TITLE-POSTFIX"
      )}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t("COMMON.META-DESCRIPTION"),
        },
      ],
    };
  },
  methods: {
    async handleSlotChange(value) {
      this.filters.slot = value;
      await this.filterSkills();
    },
    async handleCharChange(value) {
      this.filters.character = value;
      await this.filterSkills();
    },
    async handleAttrChange(value) {
      this.filters.attribute = value;
      await this.filterSkills();
    },
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
      this.isLoading = true;
      const f = this.getFilters();
      if (Object.keys(f).length === 0) {
        this.currentSkillGroups = this.skillGroups;
      } else {
        this.currentSkillGroups = await this.$axios
          .$get("/api/skill-groups", {
            params: {
              filters: f,
              sort: ["slot"],
            },
          })
          .catch((error) => {
            console.log(error.toJSON());
          });
      }
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 30px;
  width: calc(100vw - 6 * $float-space - $sidebar-width);
}
.skill-table-container {
  width: calc(100vw - 6 * $float-space - $sidebar-width);
}
@media all and (max-width: $xl) {
  .skill-table-container {
    overflow-x: auto;
  }
  .general-table {
    min-width: 500px;
  }
}
@media all and (max-width: $lg) {
  .skill-table-container {
    width: calc(100vw - 6 * $float-space - $sidebar-width-mobile);
  }
  .filter-wrapper {
    gap: 20px;
    width: calc(100vw - 6 * $float-space - $sidebar-width-mobile);
  }
}
@media all and (max-width: $md) {
  .skill-table-container {
    width: calc(100vw - 3 * $float-space);
  }
  .filter-wrapper {
    gap: 20px;
    width: calc(100vw - 3 * $float-space);
  }
}
@media all and (max-width: $sm) {
  .filter-wrapper {
    grid-template-columns: 1fr;
    width: calc(100vw - 3 * $float-space);
  }
}
</style>
