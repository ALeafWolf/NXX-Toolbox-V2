<template>
  <section>
    <div class="flex justify-between mb-4 base-panel p-4">
      <a-button class="flex" @click="toggleDateSort">
        <a-icon :type="`arrow-${isDateDesc ? 'down' : 'up'}`" />
        <span>Sell Date</span>
      </a-button>
      <a-button @click="isFilterShow = !isFilterShow">
        <a-icon type="filter" />
        {{ isFilterShow ? $t("COMMON.HIDE-FILTER") : $t("COMMON.SHOW-FILTER") }}
      </a-button>
    </div>
    <div class="filter-wrapper base-panel p-4" v-if="isFilterShow">
      <div>
        <h3 class="text-blue-600 text-lg">
          {{ $t("COMMON.CHARACTER") }}
        </h3>
        <a-select
          mode="multiple"
          class="w-full custom-select"
          :defaultValue="[]"
          dropdownClassName="custom-dropdown"
          @change="handleCharacterChange"
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
        <h3 class="text-blue-600 text-lg">
          {{ $t("MERCH.PRODUCT-SERIES") }}
        </h3>
        <a-select
          mode="multiple"
          class="w-full custom-select"
          dropdownClassName="custom-dropdown"
          :defaultValue="[]"
          @change="handleSeriesChange"
          allowClear
        >
          <a-select-option v-for="s in series" :key="s.attributes.name">
            {{ s.attributes.name }}
          </a-select-option>
        </a-select>
      </div>
      <div>
        <h3 class="text-blue-600 text-lg">
          {{ $t("MERCH.PRODUCT-TYPE") }}
        </h3>
        <a-select
          mode="multiple"
          class="w-full custom-select"
          dropdownClassName="custom-dropdown"
          :defaultValue="[]"
          @change="handleTypeChange"
        >
          <a-select-option v-for="t in types" :key="t.attributes.value">
            {{ t.attributes.value }}
          </a-select-option>
        </a-select>
      </div>
      <div>
        <h3 class="text-blue-600 text-lg">
          {{ $t("MERCH.PRODUCT-MATERIAL") }}
        </h3>
        <a-select
          mode="multiple"
          class="w-full custom-select"
          dropdownClassName="custom-dropdown"
          :defaultValue="[]"
          @change="handleMaterialChange"
        >
          <a-select-option v-for="m in materials" :key="m.attributes.value">
            {{ m.attributes.value }}
          </a-select-option>
        </a-select>
      </div>
      <div>
        <h3 class="text-blue-600 text-lg">
          {{ $t("MERCH.PRODUCT-TECHNOLOGY") }}
        </h3>
        <a-select
          mode="multiple"
          class="w-full custom-select"
          :defaultValue="[]"
          dropdownClassName="custom-dropdown"
          @change="handleTechnologyChange"
        >
          <a-select-option v-for="t in technologies" :key="t.attributes.value">
            {{ t.attributes.value }}
          </a-select-option>
        </a-select>
      </div>
      <div>
        <h3 class="text-blue-600 text-lg">
          {{ $t("MERCH.PRODUCT-PACKAGING") }}
        </h3>
        <a-select
          mode="multiple"
          class="w-full custom-select"
          :defaultValue="[]"
          dropdownClassName="custom-dropdown"
          @change="handlePackagingChange"
        >
          <a-select-option v-for="p in packagings" :key="p.attributes.value">
            {{ p.attributes.value }}
          </a-select-option>
        </a-select>
      </div>
      <div>
        <h3 class="text-blue-600 text-lg">
          {{ $t("MERCH.PRODUCT-PRICE") }}
        </h3>
        <div class="flex">
          <span>{{ priceRange[0] }}</span>
          <a-slider
            class="w-full"
            range
            :min="priceRange[0]"
            :max="priceRange[1]"
            :default-value="priceRange"
            @change="handlePriceRangeChange"
          />
          <span>{{ priceRange[1] }}</span>
        </div>
      </div>
      <div>
        <a-button class="w-full">{{ $t('COMMON.APPLY-FILTER') }}</a-button>
        <a-button class="w-full">{{ $t('COMMON.RESET-FILTER') }}</a-button>
      </div>
    </div>
    <div class="card-grid w-full">
      <div v-for="(merch, i) in currentMerches" class="sub-panel p-3" :key="i">
        <NuxtLink :to="localePath(`/merches/${merch.id}`)">
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
  data() {
    return {
      isFilterShow: true,
      isDateDesc: true,
      filters: {
        series: [],
        types: [],
        materials: [],
        technologies: [],
        packagings: [],
        priceRange: [0, 0],
        characters: [],
      },
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
    const packagingsReq = $axios.$get("/api/merch-packagings", {
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
      packagings,
      priceRange,
    ] = await Promise.all([
      merchesReq,
      seriesReq,
      typesReq,
      materialsReq,
      technologiesReq,
      packagingsReq,
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
      packagings: packagings.data,
      priceRange,
      priceFilter: priceRange,
    };
  },
  head() {
    return {
      title: `${this.$t("NAV.MERCH-LIST")} | ${this.$t('COMMON.TITLE-POSTFIX')}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.$t("NAV.MERCH-LIST")} | ${this.$t('COMMON.TITLE-POSTFIX')}`,
        },
      ],
    };
  },
  methods: {
    async toggleDateSort() {
      this.isDateDesc = !this.isDateDesc;
      await this.filterMerches();
    },
    async handleCharacterChange(value) {
      this.filters.characters = value;
      await this.filterMerches();
    },
    async handleSeriesChange(value) {
      this.filters.series = value;
      await this.filterMerches();
    },
    async handleTypeChange(value) {
      this.filters.types = value;
      await this.filterMerches();
    },
    async handleMaterialChange(value) {
      this.filters.materials = value;
      await this.filterMerches();
    },
    async handleTechnologyChange(value) {
      this.filters.technologies = value;
      await this.filterMerches();
    },
    async handlePackagingChange(value) {
      this.filters.packagings = value;
      await this.filterMerches();
    },
    async handlePriceRangeChange(value) {
      this.priceFilter = value;
      await this.filterMerches();
    },
    getFilters() {
      const f = {};
      if (this.filters.characters.length > 0) {
        const c = this.filters.characters;
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
      if (this.filters.packagings.length > 0) {
        f.packagings = {
          value: {
            $in: this.filters.packagings,
          },
        };
      }
      f["$and"] = [
        { price: { $lte: this.priceFilter[1] } },
        { price: { $gte: this.priceFilter[0] } },
      ];
      return f;
    },
    async filterMerches() {
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
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-bottom: 30px;
}
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
  .filter-wrapper {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media all and (max-width: $sm) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .filter-wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
