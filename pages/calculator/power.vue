<template>
  <div class="grid grid-cols-2 gap-4">
    <section class="base-panel buffs p-6">
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
    <section class="base-panel p-6">
      <div class="flex justify-between">
        <h3>Power: {{ totalPower }}</h3>
        <button>
          <img
            class="icon"
            src="~assets/images/icons/icon_delete.png"
            alt="Clean card deck"
            @click="cleanCardDeck"
          />
        </button>
      </div>
      <div class="grid grid-cols-5 gap-2">
        <button
          v-for="(c, i) in this.cardDesk"
          :key="`card-${i}`"
          @click="editCard(i)"
        >
          <img :src="c.thumbnail.url" :alt="c.name" />
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
    <dialog v-if="showCalcModal" id="calcModal" class="base-panel p-10">
      <button class="close-btn" @click="closeModal">
        <img
          class="icon"
          src="~/assets/images/icons/icon_close.png"
          alt="Close modal"
        />
      </button>
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
        :saveCard="saveCard"
        :editSavedCard="editSavedCard"
        :cardOptions="selectedCardOptions"
        :isSavedCard="isSavedCard"
        :deleteCard="deleteCard"
      />
    </dialog>
    <LoadingMask :isLoading="isLoading" />
  </div>
</template>

<script>
export default {
  name: "PowerCalculatorPage",
  data() {
    return {
      cards: [],
      currentCards: [],
      cardDesk: [],
      totalPower: 0,
      showCalcModal: false,
      isAddCard: true,
      isEditCard: false,
      isSavedCard: false,
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
      selectedCardOptions: {
        rank: 1,
        skill1: 1,
        skill2: 1,
        skill3: 1,
      },
    };
  },
  mounted() {
    this.isLoading = true;
    const storeCards = JSON.parse(localStorage.getItem("powerCalculatorItems"));
    const f = {};
    if (storeCards) {
      f.id = {
        $notIn: storeCards.id,
      };
    }
    this.$axios
      .$get("/api/card/power", {
        params: {
          filters: f,
          sort: ["id:desc"],
        },
      })
      .then((res) => {
        this.cards = res;
        this.currentCards = res;
        this.loadCardDesk();
      })
      .catch((error) => {
        console.log(error.toJSON());
      })
      .finally(() => (this.isLoading = false));
  },
  computed: {
    getPlaceHolder: function () {
      return 15 - this.cardDesk.length;
    }
  },
  methods: {
    loadCardDesk() {
      const cards = JSON.parse(localStorage.getItem("powerCalculatorItems"));
      if (cards && cards.id.length > 0) {
        this.$axios
          .$get("/api/card/power", {
            params: {
              filters: {
                id: {
                  $in: cards.id,
                },
              },
            },
          })
          .then((res) => {
            this.cardDesk = [];
            for (let i = 0; i < cards.id.length; i++) {
              const id = cards.id[i];
              for (let j = 0; j < res.length; j++) {
                if (res[j].id === id) {
                  this.cardDesk.push(res[j]);
                  break;
                }
              }
            }
            this.totalPower = this.loadTotalPower(cards.powers);
            this.loadBuffList();
          })
          .catch((err) => console.log(err));
      } else {
        this.cardDesk = [];
      }
    },
    loadTotalPower(powers){
      let power = 0;
      if(powers.length > 0){
        for(let i = 0; i < powers.length; i++){
          power += powers[i];
        }
      }
      return power;
    },
    loadBuffList() {},
    cleanCardDeck() {
      this.isLoading = true;
      localStorage.removeItem("powerCalculatorItems");
      this.loadCardDesk();
      this.isLoading = false;
    },
    addCard() {
      this.showCalcModal = true;
      this.isAddCard = true;
      this.isSavedCard = false;
      this.selectedCardOptions = {
        rank: 1,
        skill1: 1,
        skill2: 1,
        skill3: 1,
      };
    },
    async editCard(index) {
      const cards = JSON.parse(localStorage.getItem("powerCalculatorItems"));
      this.selectedCardOptions.id = cards.id[index];
      this.selectedCardOptions.rank = cards.rank[index];
      this.selectedCardOptions.skill1 = cards.skillLvs[index][0];
      this.selectedCardOptions.skill2 = cards.skillLvs[index][1];
      if (cards.skillLvs[index][2]) {
        this.selectedCardOptions.skill3 = cards.skillLvs[index][2];
      }
      this.isSavedCard = true;
      await this.getSelectedCard(this.selectedCardOptions.id);
    },
    closeModal() {
      this.showCalcModal = false;
      this.isAddCard = false;
      this.isEditCard = false;
    },
    async handleNameChange(value) {
      this.filters.name = value;
      this.filterCards();
    },
    async handleCharacterChange(value) {
      this.filters.characters = value;
      this.filterCards();
    },
    async handleAttributesChange(value) {
      this.filters.attributes = value;
      this.filterCards();
    },
    async handleRaritiesChange(value) {
      this.filters.rarities = value;
      this.filterCards();
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
      // f.publishedAt = {
      //   $ne: null,
      // };
      const storeCards = JSON.parse(
        localStorage.getItem("powerCalculatorItems")
      );
      if (storeCards) {
        f.id = {
          $notIn: storeCards.id,
        };
      }
      return f;
    },
    filterCards() {
      this.isLoading = true;
      const f = this.getFilters();
      if (Object.keys(f).length === 0) {
        this.currentCards = this.cards;
      } else {
        this.$axios
          .$get("/api/card/power", {
            params: {
              filters: f,
              sort: ["id:desc"],
            },
          })
          .then((res) => {
            this.currentCards = res;
          })
          .catch((error) => {
            console.log(error.toJSON());
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
    async getSelectedCard(id) {
      this.isLoading = true;
      const cards = await this.$axios
        .$get(`/api/card/power`, {
          params: {
            filters: {
              id: {
                $eq: id,
              },
            },
          },
        })
        .catch((error) => {
          console.log(error);
        });
      this.selectedCard = cards[0];
      this.isAddCard = false;
      this.isEditCard = true;
      this.showCalcModal = true;
      this.isLoading = false;
    },
    goBack() {
      this.isAddCard = true;
      this.isEditCard = false;
    },
    getStoredCards() {
      let data = JSON.parse(localStorage.getItem("powerCalculatorItems"));
      if (!data) {
        data = {
          id: [],
          rank: [],
          skillLvs: [],
          powers: [],
        };
      }
      return data;
    },
    saveCard(id, rarity, options, power) {
      let data = this.getStoredCards();
      data.id.push(id);
      data.rank.push(options.rank);
      const skills = [];
      const length = rarity === "R" ? 2 : 3;
      for (let i = 1; i <= length; i++) {
        skills.push(options[`skill${i}`]);
      }
      data.skillLvs.push(skills);
      data.powers.push(power);
      localStorage.setItem("powerCalculatorItems", JSON.stringify(data));
      this.loadCardDesk();
      this.showCalcModal = false;
      this.isEditCard = false;
    },
    editSavedCard(id, rarity, options, power) {
      let data = this.getStoredCards();
      const index = data.id.indexOf(id);
      data.rank[index] = options.rank;
      const skills = [];
      const length = rarity === "R" ? 2 : 3;
      for (let i = 1; i <= length; i++) {
        skills.push(options[`skill${i}`]);
      }
      data.skillLvs[index] = skills;
      data.powers[index] = power;
      localStorage.setItem("powerCalculatorItems", JSON.stringify(data));
      this.loadCardDesk();
      this.showCalcModal = false;
      this.isEditCard = false;
    },
    deleteCard(id) {
      const data = JSON.parse(localStorage.getItem("powerCalculatorItems"));
      const i = data.id.indexOf(id);
      data.id.splice(i, 1);
      data.rank.splice(i, 1);
      data.skillLvs.splice(i, 1);
      localStorage.setItem("powerCalculatorItems", JSON.stringify(data));
      this.loadCardDesk();
      this.showCalcModal = false;
      this.isEditCard = false;
    },
    getAttributeWithRank(rank, attribute) {
      if (rank === 5) return attribute;
      return Math.round((attribute / 1.4) * (1 + 0.1 * (rank - 1)));
    },
    getSkillNumber(lv1num, lv10num, lv) {
      return lv1num + ((lv10num - lv1num) / 10) * (lv - 1);
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
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  > .close-btn {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}
</style>
