<template>
  <div class="grid grid-cols-2 gap-4">
    <section class="base-panel buffs">
      <h3>Buff List</h3>
      <div class="row">
        <div class="header">
          <img class="icon" src="~assets/images/LOGIC.png" alt="logic" />
        </div>
        <div class="content"></div>
      </div>
      <div class="row">
        <div class="header">
          <img class="icon" src="~assets/images/EMPATHY.png" alt="logic" />
        </div>
        <div class="content"></div>
      </div>
      <div class="row">
        <div class="header">
          <img class="icon" src="~assets/images/INTUITION.png" alt="logic" />
        </div>
        <div class="content"></div>
      </div>
      <div class="row">
        <div class="header">
          <img class="icon" src="~assets/images/夏彦.webp" alt="logic" />
        </div>
        <div class="content"></div>
      </div>
      <div class="row">
        <div class="header">
          <img class="icon" src="~assets/images/左然.webp" alt="logic" />
        </div>
        <div class="content"></div>
      </div>
      <div class="row">
        <div class="header">
          <img class="icon" src="~assets/images/莫弈.webp" alt="logic" />
        </div>
        <div class="content"></div>
      </div>
      <div class="row">
        <div class="header">
          <img class="icon" src="~assets/images/陆景和.webp" alt="logic" />
        </div>
        <div class="content"></div>
      </div>
    </section>
    <section class="base-panel">
      <h3>Power: {{ totalPower }}</h3>
      <div class="grid grid-cols-5 gap-2">
        <button
          v-for="(c, i) in this.cardDesk"
          :key="`card-${i}`"
          @click="editCard()"
        >
          <img src="~/assets/images/card-placeholder.png" alt="Placeholder" />
        </button>
        <button
          v-for="i in this.getPlaceHolder"
          :key="`placeholder-${i}`"
          @click="addCard()"
        >
          <img
            class="large-icon"
            src="~/assets/images/card-placeholder.png"
            alt="Placeholder"
          />
        </button>
      </div>
    </section>
    <dialog v-if="showCalcModal" id="calcModal" class="base-panel p-4">
      <div class="flex justify-end mb-4">
        <button class="close-btn" @click="closeModal">Close</button>
      </div>
      <AddCardDesk
        v-if="isAddCard"
        :cards="currentCards"
        :handleNameChange="handleNameChange"
        :handleCharacterChange="handleCharacterChange"
        :handleAttributesChange="handleAttributesChange"
        :handleRaritiesChange="handleRaritiesChange"
        :onClick="getSelectedCard"
      />
      <EditCardDesk
        v-if="isEditCard"
        :card="this.selectedCard"
        :goBack="goBack"
        :handleStarChange="handleStarChange"
      />
    </dialog>
    <LoadingMask isLoading />
  </div>
</template>

<script>
export default {
  name: "PowerCalculatorPage",
  data() {
    return {
      cardDesk: [],
      totalPower: -1,
      showCalcModal: true,
      isAddCard: true,
      isEditCard: false,
      filters: {
        name: "",
        characters: [],
        attributes: [],
        rarities: [],
      },
      isLoading: false,
      selectedCard: {
        id: "-1",
        thumbnail: {
          url: "",
        },
        skills: [],
        character: "",
        rarity: "",
      },
    };
  },
  async asyncData({ $axios }) {
    const cards = await $axios.$get("/api/card/list").catch((error) => {
      console.log(error.toJSON());
    });
    return {
      cards,
      currentCards: cards,
    };
  },
  computed: {
    getPlaceHolder: function () {
      return 15 - this.cardDesk.length;
    },
  },
  methods: {
    addCard() {
      this.showCalcModal = true;
      this.isAddCard = true;
    },
    editCard() {
      this.showCalcModal = true;
      this.isEditCard = true;
    },
    closeModal() {
      this.showCalcModal = false;
      this.isAddCard = false;
      this.isEditCard = false;
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
    async getSelectedCard(name) {
      this.isLoading = true;
      this.selectedCard = await this.$axios
        .$get(`/api/card/detail/${encodeURIComponent(name)}`)
        .catch((error) => {
          console.log(error);
        });
      this.isAddCard = false;
      this.isEditCard = true;
      this.isLoading = false;
    },
    goBack() {
      this.isAddCard = true;
      this.isEditCard = false;
    },
    handleStarChange(value) {},
    getAttributeWithStar(star, attribute) {
      return (attribute / 1.4) * (1 + 0.1 * (star - 1));
    },
  },
  head() {
    return {
      title: `${this.$t("NAV.CARD-POWER-CALC")} | ${this.$t(
        "COMMON.TITLE-POSTFIX"
      )}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.$t("NAV.CARD-POWER-CALC")} | ${this.$t(
            "COMMON.TITLE-POSTFIX"
          )}`,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.buffs {
  > .row {
    display: grid;
    grid-template-columns: auto auto;
    gap: 10px;
    padding: 5px;
  }
}
#calcModal {
  background-color: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  min-height: 100%;
}
</style>
