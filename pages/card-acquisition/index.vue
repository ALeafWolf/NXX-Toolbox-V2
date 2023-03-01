<template>
  <section>
    <div class="base-panel p-4 mb-4">
      <div class="mb-4">
        <a-input-search
          :placeholder="$t('CARD-ACQUISITION.SEARCH-BY-NAME')"
          size="large"
          @search="handleNameChange"
        />
      </div>
      <div class="grid grid-cols-3 gap-4">
        <div>
          <h3>
            {{ $t("COMMON.SERVER") }}
          </h3>
          <a-select
            mode="multiple"
            class="w-full custom-select"
            :defaultValue="[]"
            dropdownClassName="custom-dropdown"
            @change="handleServerChange"
          >
            <a-select-option key="CN">
              {{ $t("COMMON.CN") }}
            </a-select-option>
            <a-select-option key="GLOBAL">
              {{ $t("COMMON.GLOBAL") }}
            </a-select-option>
          </a-select>
        </div>
        <div class="col-span-2">
          <h3>
            {{ $t("CARD-ACQUISITION.TYPE") }}
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <a-select
              mode="multiple"
              class="w-full custom-select"
              :defaultValue="[]"
              dropdownClassName="custom-dropdown"
              @change="handleTypeChange"
            >
              <a-select-option key="POOL">
                {{ $t("COMMON.POOL") }}
              </a-select-option>
              <a-select-option key="OTHER">
                {{ $t("COMMON.OTHER") }}
              </a-select-option>
            </a-select>
            <a-select
              mode="multiple"
              class="w-full custom-select"
              :defaultValue="[]"
              dropdownClassName="custom-dropdown"
              @change="handleSubtypeChange"
            >
              <a-select-option v-for="o in getSubtypeOptions" :key="o">
                {{ $t(`COMMON.${o}`) }}
              </a-select-option>
            </a-select>
          </div>
        </div>
      </div>
    </div>
    <AcquisitionTable
      :entries="acquisition"
      :startDateDesc="startDateDesc"
      :endDateDesc="endDateDesc"
      :toggleSortHeader="toggleSortHeader"
      :locale="$i18n.locale"
    />
    <LoadingMask :isShow="isLoading" />
  </section>
</template>

<script>
export default {
  data() {
    return {
      startDateDesc: true,
      endDateDesc: true,
      isLoading: false,
      filters: {
        server: [],
        type: [],
        subtype: [],
        name: "",
      },
      filterOptions: {
        pool: [
          "PERMANENT-POOL",
          "ROTATION-POOL",
          "EVENT-POOL",
          "EVENT-LIMITED-POOL",
          "RERUN-POOL",
          "EXCHANGE",
          "OTHER",
        ],
        other: ["EVENT-REWARD", "ANOMALY-LEVEL", "TOP-UP-REWARD"],
      },
    };
  },
  async asyncData({ $axios }) {
    const acquisition = await $axios
      .$get("/api/card-acquisition/list", {
        params: {
          sort: ["start:desc", "end:desc", 'id:desc'],
        },
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
    return {
      acquisition,
    };
  },
  computed: {
    getSubtypeOptions: function () {
      if (this.filters.type.length === 1) {
        if (this.filters.type[0] === "POOL") return this.filterOptions.pool;
        else if (this.filters.type[0] === "OTHER")
          return this.filterOptions.other;
        else return [];
      }
      return this.filterOptions.pool.concat(this.filterOptions.other);
    },
  },
  methods: {
    async toggleSortHeader(date) {
      if (date === "start") {
        this.startDateDesc = !this.startDateDesc;
      } else if (date === "end") {
        this.endDateDesc = !this.endDateDesc;
      }
      await this.filterAcquisitions();
    },
    async handleNameChange(value) {
      this.filters.name = value;
      await this.filterAcquisitions();
    },
    async handleServerChange(value) {
      this.filters.server = value;
      await this.filterAcquisitions();
    },
    async handleTypeChange(value) {
      this.filters.type = value;
      await this.filterAcquisitions();
    },
    async handleSubtypeChange(value) {
      this.filters.subtype = value;
      await this.filterAcquisitions();
    },
    getFilters() {
      const f = {};
      if (this.filters.name !== "") {
        f.cards = {
          $or: [
            {
              name: {
                $eq: this.filters.name,
              },
            },
            {
              name_en: {
                $eq: this.filters.name,
              },
            },
            {
              name_ko: {
                $eq: this.filters.name,
              },
            },
          ],
        };
      }
      if (this.filters.server.length > 0) {
        f.server = {
          $in: this.filters.server,
        };
      }
      if (this.filters.type.length > 0) {
        f.type = {
          $in: this.filters.type,
        };
      }
      if (this.filters.subtype.length > 0) {
        f.subtype = {
          $in: this.filters.subtype,
        };
      }
      return f;
    },
    getSorts() {
      const s = [];
      s.push(`start:${this.startDateDesc ? "desc" : "asc"}`);
      s.push(`end:${this.endDateDesc ? "desc" : "asc"}`);
      return s;
    },
    async filterAcquisitions() {
      this.isLoading = true;
      const sort = this.getSorts();
      const filters = this.getFilters();
      console.log(filters);
      const acquisition = await this.$axios
        .$get("/api/card-acquisition/list", {
          params: {
            sort: sort,
            filters: filters,
          },
        })
        .catch((error) => {
          console.log(error.toJSON());
        });
      this.acquisition = acquisition;
      this.isLoading = false;
    },
  },
  head() {
    return {
      title: `思绪获取方式 | 牛叉叉牌工具箱`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `思绪获取方式 | 牛叉叉牌工具箱`,
        },
      ],
    };
  },
};
</script>
