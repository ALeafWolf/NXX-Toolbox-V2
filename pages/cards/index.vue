<template>
  <section>
    <div>
      <table class="mx-auto my-4 text-center sub-panel">
        <tr>
          <th>-</th>
          <th>
            <img
              class="icon m-auto"
              src="~/assets/images/LUKE.webp"
              alt="夏彦"
            />
          </th>
          <th>
            <img
              class="icon m-auto"
              src="~/assets/images/ARTEM.webp"
              alt="左然"
            />
          </th>
          <th>
            <img
              class="icon m-auto"
              src="~/assets/images/VYN.webp"
              alt="莫弈"
            />
          </th>
          <th>
            <img
              class="icon m-auto"
              src="~/assets/images/MARIUS.webp"
              alt="陆景和"
            />
          </th>
        </tr>
        <tr>
          <th>SSR</th>
          <td>{{ cardCount.luke[3] }}</td>
          <td>{{ cardCount.artem[3] }}</td>
          <td>{{ cardCount.vyn[3] }}</td>
          <td>{{ cardCount.marius[3] }}</td>
        </tr>
        <tr>
          <th>SR</th>
          <td>{{ cardCount.luke[2] }}</td>
          <td>{{ cardCount.artem[2] }}</td>
          <td>{{ cardCount.vyn[2] }}</td>
          <td>{{ cardCount.marius[2] }}</td>
        </tr>
        <tr>
          <th>MR</th>
          <td>{{ cardCount.luke[1] }}</td>
          <td>{{ cardCount.artem[1] }}</td>
          <td>{{ cardCount.vyn[1] }}</td>
          <td>{{ cardCount.marius[1] }}</td>
        </tr>
        <tr>
          <th>R</th>
          <td>{{ cardCount.luke[0] }}</td>
          <td>{{ cardCount.artem[0] }}</td>
          <td>{{ cardCount.vyn[0] }}</td>
          <td>{{ cardCount.marius[0] }}</td>
        </tr>
      </table>
      <div class="base-panel p-4 mb-4">
        <div class="mb-4">
          <a-input-search
            :placeholder="$t('CARD-ACQUISITION.SEARCH-BY-NAME')"
            size="large"
            @search="handleNameChange"
          />
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <h4>
              {{ $t("COMMON.CHARACTER") }}
            </h4>
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
            </a-select>
          </div>
          <div>
            <h4>
              {{ $t("COMMON.ATTRIBUTE") }}
            </h4>
            <a-select
              mode="multiple"
              class="w-full custom-select"
              :defaultValue="[]"
              dropdownClassName="custom-dropdown"
              @change="handleAttributesChange"
            >
              <a-select-option key="LOGIC">
                {{ $t("COMMON.LOGIC") }}
              </a-select-option>
              <a-select-option key="EMPATHY">
                {{ $t("COMMON.EMPATHY") }}
              </a-select-option>
              <a-select-option key="INTUITION">
                {{ $t("COMMON.INTUITION") }}
              </a-select-option>
            </a-select>
          </div>
          <div>
            <h4>
              {{ $t("COMMON.RARITY") }}
            </h4>
            <a-select
              mode="multiple"
              class="w-full custom-select"
              :defaultValue="[]"
              dropdownClassName="custom-dropdown"
              @change="handleRaritiesChange"
            >
              <a-select-option key="R"> R </a-select-option>
              <a-select-option key="MR"> MR </a-select-option>
              <a-select-option key="SR"> SR </a-select-option>
              <a-select-option key="SSR"> SSR </a-select-option>
            </a-select>
          </div>
          <div>
            <h4>
              {{ $t("NAV.CARD-ACQUISITION") }}
            </h4>
            <a-select
              mode="multiple"
              class="w-full custom-select"
              :defaultValue="[]"
              dropdownClassName="custom-dropdown"
              @change="handleAcquisitionsChange"
            >
              <a-select-option key="POOL">
                {{ $t("COMMON.POOL") }}
              </a-select-option>
              <a-select-option key="OTHER">
                {{ $t("COMMON.OTHER") }}
              </a-select-option>
            </a-select>
          </div>
        </div>
      </div>
      <div class="w-full flex justify-end mb-6">
        <div class="switch-btn-row">
          <button
            class="switch-btn"
            :class="{ ['selected']: isGrid }"
            @click="setIsGrid(true)"
          >
            {{ $t("COMMON.GRID") }}
          </button>
          <button
            class="switch-btn"
            :class="{ ['selected']: !isGrid }"
            @click="setIsGrid(false)"
          >
            {{ $t("COMMON.TABLE") }}
          </button>
        </div>
      </div>
      <div v-show="isGrid" class="card-grid w-full">
        <CardGridItem
          v-for="(card, i) in currentCards"
          :key="i"
          :card="card"
          :url="`/cards/${$globalV.nameToSlug(
            card[`name${$globalV.getLocalePostfix($i18n.locale)}`]
          )}`"
        />
      </div>
      <div class="list-table" v-show="!isGrid">
        <table class="w-full text-center general-table">
          <thead>
            <tr>
              <th>{{ $t("COMMON.THUMBNAIL") }}</th>
              <th>{{ $t("COMMON.NAME") }}</th>
              <th>{{ $t("COMMON.RARITY") }}</th>
              <th>{{ $t("COMMON.ATTRIBUTE") }}</th>
              <th>{{ $t("COMMON.INFLUENCE") }}</th>
              <th>{{ $t("COMMON.DEFENSE") }}</th>
              <th>{{ $t("COMMON.SKILL") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(card, i) in currentCards" :key="i">
              <td>
                <NuxtLink
                  :to="
                    localePath(
                      `/cards/${$globalV.nameToSlug(
                        card[`name${$globalV.getLocalePostfix($i18n.locale)}`]
                      )}`
                    )
                  "
                >
                  <img
                    class="large-icon m-auto"
                    :src="card.thumbnail.url"
                    :alt="
                      card[`name${$globalV.getLocalePostfix($i18n.locale)}`]
                    "
                  />
                </NuxtLink>
              </td>
              <td>
                <NuxtLink
                  :to="
                    localePath(
                      `/cards/${$globalV.nameToSlug(
                        card[`name${$globalV.getLocalePostfix($i18n.locale)}`]
                      )}`
                    )
                  "
                >
                  {{ card[`name${$globalV.getLocalePostfix($i18n.locale)}`] }}
                </NuxtLink>
              </td>
              <td>{{ card.rarity.value }}</td>
              <td>
                <img
                  class="icon m-auto"
                  :src="require(`assets/images/${card.attribute}.png`)"
                  :alt="card.attribute"
                />
              </td>
              <td>{{ card.influence }}</td>
              <td>{{ card.defense }}</td>
              <td>
                <div class="flex justify-center">
                  <span v-for="(skill, i) in card.skills" :key="i">
                    <NuxtLink
                      :to="
                        localePath(
                          `/skills/${$globalV.nameToSlug(
                            skill[
                              `name${$globalV.getLocalePostfix($i18n.locale)}`
                            ]
                          )}`
                        )
                      "
                    >
                      <img
                        class="icon"
                        :src="skill.skill_group.icon.url"
                        :alt="
                          skill[
                            `name${$globalV.getLocalePostfix($i18n.locale)}`
                          ]
                        "
                      />
                    </NuxtLink>
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <LoadingMask :isShow="isLoading" />
  </section>
</template>
<script>
export default {
  data() {
    return {
      isGrid: false,
      filters: {
        name: "",
        attributes: [],
        characters: [],
        rarities: [],
        acquisitions: [],
      },
      isLoading: false,
    };
  },
  async asyncData({ $axios }) {
    const cards = await $axios.$get("/api/card/list").catch((error) => {
      console.log(error.toJSON());
    });
    const cardCount = {
      luke: [0, 0, 0, 0],
      artem: [0, 0, 0, 0],
      vyn: [0, 0, 0, 0],
      marius: [0, 0, 0, 0],
    };
    cards.forEach((c) => {
      switch (c.character.id) {
        case 2: //luke
          cardCount.luke[c.rarity.id - 1]++;
          break;
        case 3: //artem
          cardCount.artem[c.rarity.id - 1]++;
          break;
        case 4: //vyn
          cardCount.vyn[c.rarity.id - 1]++;
          break;
        case 5: //marius
          cardCount.marius[c.rarity.id - 1]++;
          break;
      }
    });
    return {
      cards,
      currentCards: cards,
      cardCount,
    };
  },
  methods: {
    setIsGrid(bool) {
      this.isGrid = bool;
    },
    async handleNameChange(value) {
      this.filters.name = value;
      await this.filterCards();
    },
    async handleCharacterChange(value) {
      this.filters.characters = value;
      await this.filterCards();
    },
    async handleAttributesChange(value) {
      this.filters.attributes = value;
      await this.filterCards();
    },
    async handleRaritiesChange(value) {
      this.filters.rarities = value;
      await this.filterCards();
    },
    async handleAcquisitionsChange(value) {
      this.filters.acquisitions = value;
      await this.filterCards();
    },
    getFilters() {
      const f = {};
      if (this.filters.name !== "") {
        f["$or"] = [
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
        ];
      }
      if (this.filters.characters.length > 0) {
        f.character = {
          name: {
            $eq: this.filters.characters[0],
          },
        };
      }
      if (this.filters.attributes.length > 0) {
        f.attribute = {
          $in: this.filters.attributes,
        };
      }
      if (this.filters.rarities.length > 0) {
        f.rarity = {
          value: {
            $in: this.filters.rarities,
          },
        };
      }
      if (this.filters.acquisitions.length > 0) {
        if (this.filters.acquisitions.includes("POOL")) {
          f["$or"] = [
            {
              card_acquisitions: {
                type: {
                  $in: this.filters.acquisitions,
                },
              },
            },
            {
              is_permanent: {
                $eq: true,
              },
            },
          ];
        } else {
          f.card_acquisitions = {
            type: {
              $in: this.filters.acquisitions,
            },
          };
        }
      }
      f.publishedAt = {
        $ne: null,
      };
      return f;
    },
    async filterCards() {
      this.isLoading = true;
      const f = this.getFilters();
      if (Object.keys(f).length === 0) {
        this.currentCards = this.cards;
      } else {
        this.currentCards = await this.$axios
          .$get("/api/card/list", {
            params: {
              filters: f,
            },
          })
          .catch((error) => {
            console.log(error.toJSON());
          });
        this.isLoading = false;
      }
    },
  },
  head() {
    return {
      title: `${this.$t("NAV.CARD-LIST")} - ${this.$t("COMMON.TITLE-POSTFIX")}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t("COMMON.META-DESCRIPTION"),
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
}
.list-table {
  overflow-x: auto;
}
.general-table {
  min-width: $sm;
}
@media all and (max-width: $lg) {
  .card-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}
@media all and (max-width: $md) {
  .card-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  .general-table {
    .large-icon {
      max-width: 50px;
      max-height: 50px;
    }
  }
}
@media all and (max-width: $sm) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .list-table {
    width: calc(100vw - 2 * $float-space);
  }
}
</style>
