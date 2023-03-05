<template>
  <section>
    <div class="flex justify-between mb-4 base-panel p-4">
      <a-button @click="toggleDateSort">
        <a-icon :type="`arrow-${isDateDesc ? 'down' : 'up'}`" />
        {{ $t("MERCH.FIRST-SELL-TIME") }}
      </a-button>
      <a-button @click="isFilterShow = !isFilterShow">
        <a-icon type="filter" />
        {{ isFilterShow ? $t("COMMON.HIDE-FILTER") : $t("COMMON.SHOW-FILTER") }}
      </a-button>
    </div>
    <div class="filter-wrapper base-panel p-4 mb-4" v-if="isFilterShow">
      <div>
        <h3 class="title">
          {{ $t("COMMON.CHARACTER") }}
        </h3>
        <a-select
          mode="multiple"
          class="w-full custom-select"
          v-model="filters.characters"
          dropdownClassName="custom-dropdown"
        >
          <a-select-option key="LUKE">
            {{ $t("COMMON.LUKE") }}
          </a-select-option>
          <a-select-option key="ARTEM">
            {{ $t("COMMON.ARTEM") }}
          </a-select-option>
          <a-select-option key="VYN">
            {{ $t("COMMON.VYN") }}
          </a-select-option>
          <a-select-option key="MARIUS">
            {{ $t("COMMON.MARIUS") }}
          </a-select-option>
          <a-select-option key="OTHER">
            {{ $t("COMMON.OTHER") }}
          </a-select-option>
        </a-select>
      </div>
      <div>
        <h3 class="title">
          {{ $t("MERCH.PRODUCT-SERIES") }}
        </h3>
        <a-select
          mode="multiple"
          class="w-full custom-select"
          dropdownClassName="custom-dropdown"
          v-model="filters.series"
          allowClear
        >
          <a-select-option v-for="s in series" :key="s.attributes.name">
            {{ s.attributes.name }}
          </a-select-option>
        </a-select>
      </div>
      <div>
        <h3 class="title">
          {{ $t("MERCH.ART-SOURCE") }}
        </h3>
        <a-select
          mode="multiple"
          class="w-full custom-select"
          v-model="filters.artSources"
          dropdownClassName="custom-dropdown"
        >
          <a-select-option :key="`IN-GAME`">
            {{ $t(`MERCH.IN-GAME`) }}
          </a-select-option>
          <a-select-option :key="`OTHER`">
            {{ $t(`MERCH.OTHER`) }}
          </a-select-option>
        </a-select>
      </div>
      <div>
        <h3 class="title">
          {{ $t("MERCH.ART-STYLE") }}
        </h3>
        <a-select
          mode="multiple"
          class="w-full custom-select"
          v-model="filters.artStyles"
          dropdownClassName="custom-dropdown"
        >
          <a-select-option v-for="p in artStyles" :key="p.attributes.value">
            {{ $t(`MERCH.${p.attributes.value}`) }}
          </a-select-option>
        </a-select>
      </div>
      <div>
        <h3 class="title">
          {{ $t("MERCH.PRODUCT-TYPE") }}
        </h3>
        <a-select
          mode="multiple"
          class="w-full custom-select"
          dropdownClassName="custom-dropdown"
          v-model="filters.types"
        >
          <a-select-option v-for="t in types" :key="t.attributes.value">
            {{ t.attributes.value }}
          </a-select-option>
        </a-select>
      </div>
      <div>
        <h3 class="title">
          {{ $t("MERCH.PRODUCT-MATERIAL") }}
        </h3>
        <a-select
          mode="multiple"
          class="w-full custom-select"
          dropdownClassName="custom-dropdown"
          v-model="filters.materials"
        >
          <a-select-option v-for="m in materials" :key="m.attributes.value">
            {{ m.attributes.value }}
          </a-select-option>
        </a-select>
      </div>
      <div>
        <h3 class="title">
          {{ $t("MERCH.PRODUCT-TECHNOLOGY") }}
        </h3>
        <a-select
          mode="multiple"
          class="w-full custom-select"
          v-model="filters.technologies"
          dropdownClassName="custom-dropdown"
        >
          <a-select-option v-for="t in technologies" :key="t.attributes.value">
            {{ t.attributes.value }}
          </a-select-option>
        </a-select>
      </div>
      <div class="selection-block">
        <div>
          <h3 class="title">
            {{ $t("MERCH.IS-RELEASED") }}
          </h3>
          <div>
            <a-radio-group v-model="filters.isReleased">
              <a-radio-button :value="null">
                {{ $t("MERCH.ALL") }}
              </a-radio-button>
              <a-radio-button :value="true">
                {{ $t("MERCH.YES") }}
              </a-radio-button>
              <a-radio-button :value="false">
                {{ $t("MERCH.NO") }}
              </a-radio-button>
            </a-radio-group>
          </div>
        </div>
        <div>
          <h3 class="title">
            {{ $t("MERCH.IS-LIMITED-TIME") }}
          </h3>
          <div>
            <a-radio-group v-model="filters.isLimitedTime">
              <a-radio-button :value="null">
                {{ $t("MERCH.ALL") }}
              </a-radio-button>
              <a-radio-button :value="true">
                {{ $t("MERCH.YES") }}
              </a-radio-button>
              <a-radio-button :value="false">
                {{ $t("MERCH.NO") }}
              </a-radio-button>
            </a-radio-group>
          </div>
        </div>
      </div>
      <div class="complex-filter-block">
        <div>
          <h3 class="title">
            {{ $t("MERCH.SELL-TIME") }}
          </h3>
          <a-range-picker
            id="sellDateRange"
            :placeholder="[
              $t('CARD-ACQUISITION.START'),
              $t('CARD-ACQUISITION.END'),
            ]"
            v-model="filters.sellDateRange"
          />
        </div>
        <div>
          <h3 class="title">
            {{
              `${$t("MERCH.PRODUCT-PRICE")}: ￥${filters.priceRange[0]} - ￥${
                filters.priceRange[1]
              }`
            }}
          </h3>
          <div class="flex">
            <a-slider
              class="w-full"
              range
              :min="priceRange[0]"
              :max="priceRange[1]"
              v-model="filters.priceRange"
            />
          </div>
        </div>
      </div>
      <div class="btn-block">
        <a-button class="w-full" @click="filterMerches">{{
          $t("COMMON.APPLY-FILTER")
        }}</a-button>
        <a-button class="w-full" @click="resetFilters">{{
          $t("COMMON.RESET-FILTER")
        }}</a-button>
      </div>
    </div>
    <div class="item-grid w-full">
      <div v-for="(merch, i) in currentMerches" class="sub-panel p-3" :key="i">
        <NuxtLink :to="localePath(`/merches/${merch.id}`)" _target="_blank">
          <img
            class="large-icon m-auto"
            :src="merch.avatar.url"
            :alt="merch.name"
            lazy
          />
        </NuxtLink>
        <div class="flex justify-center">
          <h5>{{ merch.name }}</h5>
        </div>
      </div>
    </div>
    <LoadingMask :isShow="isLoading" />
  </section>
</template>

<script>
export default {
  name: "MerchPage",
  data() {
    return {
      isFilterShow: true,
      isDateDesc: true,
      filters: {
        series: [],
        types: [],
        materials: [],
        technologies: [],
        priceRange: [0, 0],
        characters: [],
        artStyles: [],
        artSources: [],
        isReleased: null,
        sellDateRange: [null, null],
        isLimitedTime: null,
      },
      isLoading: false,
    };
  },
  async asyncData({ $axios }) {
    const merchesReq = $axios.$get("/api/merch/list", {
      params: {
        sort: {
          id: "desc",
        },
      },
    });
    const seriesReq = $axios.$get("/api/merch-serieses", {
      params: {
        fields: ["name"],
      },
    });
    const typesReq = $axios.$get("/api/merch-types", {
      params: {
        fields: ["value"],
      },
    });
    const materialsReq = $axios.$get("/api/merch-materials", {
      params: {
        fields: ["value"],
      },
    });
    const technologiesReq = $axios.$get("/api/merch-technologies", {
      params: {
        fields: ["value"],
      },
    });
    const artStylesReq = $axios.$get("/api/merch-art-styles", {
      params: {
        fields: ["value"],
      },
    });
    const priceRangeReq = $axios.$get("/api/merch/price-range");
    const [
      merches,
      series,
      types,
      materials,
      technologies,
      artStyles,
      priceRange,
    ] = await Promise.all([
      merchesReq,
      seriesReq,
      typesReq,
      materialsReq,
      technologiesReq,
      artStylesReq,
      priceRangeReq,
    ]).catch((err) => {
      console.log(err);
    });
    for (let i = 0; i < priceRange.length; i++) {
      priceRange[i] = parseInt(priceRange[i]);
    }
    return {
      merches,
      currentMerches: merches,
      series: series.data,
      types: types.data,
      materials: materials.data,
      technologies: technologies.data,
      artStyles: artStyles.data,
      priceRange,
    };
  },
  mounted() {
    this.filters.priceRange = this.priceRange;
  },
  head() {
    return {
      title: `${this.$t("NAV.MERCH-LIST")} | ${this.$t(
        "COMMON.TITLE-POSTFIX"
      )}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.$t("NAV.MERCH-LIST")} | ${this.$t(
            "COMMON.TITLE-POSTFIX"
          )}`,
        },
      ],
    };
  },
  methods: {
    async toggleDateSort() {
      this.isDateDesc = !this.isDateDesc;
      await this.filterMerches();
    },
    getFilters() {
      const f = {};
      if (this.filters.characters.length > 0) {
        const c = [...this.filters.characters];
        if (
          (this.filters.characters[0] !== "OTHER" &&
            this.filters.characters.length === 1) ||
          this.filters.characters.length > 1
        ) {
          c.push("ALL");
        }
        f.character = {
          name: {
            $in: c,
          },
        };
      }
      if (this.filters.series.length > 0) {
        f.series = {
          name: {
            $in: this.filters.series,
          },
        };
      }
      if (this.filters.types.length > 0) {
        f.type = {
          value: {
            $in: this.filters.types,
          },
        };
      }
      if (this.filters.materials.length > 0) {
        f.materials = {
          value: {
            $in: this.filters.materials,
          },
        };
      }
      if (this.filters.technologies.length > 0) {
        f.technologies = {
          value: {
            $in: this.filters.technologies,
          },
        };
      }
      if (this.filters.artStyles.length > 0) {
        f["art_styles"] = {
          value: {
            $in: this.filters.artStyles,
          },
        };
      }
      if (this.filters.artSources.length > 0) {
        f["art_source"] = {
          $in: this.filters.artSources,
        };
      }
      if (this.filters.isReleased !== null) {
        f["is_released"] = {
          $eq: this.filters.isReleased,
        };
      }
      if (this.filters.isLimitedTime !== null) {
        if (this.filters.isLimitedTime === true) {
          f.sell_dates = {
            end: {
              date: {
                $notNull: true,
              },
            },
          };
        } else if (this.filters.isLimitedTime === false) {
          f.sell_dates = {
            end: {
              date: {
                $null: true,
              },
            },
          };
        }
      }
      f["$and"] = [
        { price: { $lte: this.filters.priceRange[1] } },
        { price: { $gte: this.filters.priceRange[0] } },
      ];
      if (
        this.filters.sellDateRange[0] !== null &&
        this.filters.sellDateRange[1] !== null
      ) {
        const date = [
          this.filters.sellDateRange[0].format("YYYY-MM-DD"),
          this.filters.sellDateRange[1].format("YYYY-MM-DD"),
        ];
        // exclude dates that...
        f["$not"] = {
          sell_dates: {
            $or: [
              {
                // start date is greater than the end of date range
                start: {
                  date: {
                    $gt: date[1],
                  },
                },
              },
              {
                // end date is less than the start of date range
                end: {
                  $and: [
                    {
                      date: {
                        $lt: date[0],
                      },
                    },
                    {
                      date: {
                        $notNull: true,
                      },
                    },
                  ],
                },
              },
            ],
          },
        };
      }
      return f;
    },
    resetFilters() {
      this.filters = {
        series: [],
        types: [],
        materials: [],
        technologies: [],
        priceRange: this.priceRange,
        characters: [],
        artStyles: [],
        artSources: [],
        isReleased: null,
        sellDateRange: [null, null],
      };
    },
    async filterMerches() {
      this.isLoading = true;
      const f = this.getFilters();
      const s = [`id:${this.isDateDesc ? "desc" : "asc"}`];
      if (Object.keys(f).length === 0) {
        this.currentMerches = this.merches;
      } else {
        this.currentMerches = await this.$axios
          .$get("/api/merch/list", {
            params: {
              filters: f,
              sort: s,
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

<style lang="scss">
#sellDateRange {
  width: 100%;
}
</style>

<style lang="scss" scoped>
.filter-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  .title {
    margin-bottom: 8px;
  }
}
.selection-block,
.complex-filter-block,
.btn-block {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  grid-column: 1 / span 4;
}
.item-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}
@media all and (max-width: $xl) {
  .filter-wrapper {
    grid-template-columns: repeat(3, 1fr);
  }
  .selection-block {
    grid-column: span 2 / span 2;
  }
  .complex-filter-block,
  .btn-block {
    grid-column: 1 / span 3;
  }
  .item-grid {
    gap: 24px;
  }
}
@media all and (max-width: $lg) {
  .filter-wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
  .selection-block,
  .complex-filter-block,
  .btn-block {
    grid-column: 1 / span 2;
  }
  .item-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media all and (max-width: $md) {
  .filter-wrapper {
    grid-template-columns: repeat(3, 1fr);
  }
  .selection-block {
    grid-column: span 2 / span 2;
  }
  .complex-filter-block,
  .btn-block {
    grid-column: 1 / span 3;
  }
  .item-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media all and (max-width: $sm) {
  .item-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .filter-wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
  .complex-filter-block {
    grid-template-columns: 1fr;
  }
  .selection-block,
  .complex-filter-block,
  .btn-block {
    grid-column: 1 / span 2;
  }
}
</style>
