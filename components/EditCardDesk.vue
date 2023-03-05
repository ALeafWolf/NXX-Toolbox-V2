<template>
  <div>
    <div class="flex justify-between">
      <button @click="goBack">
        <img
          class="icon"
          src="~/assets/images/icons/icon_back.png"
          alt="Back to add card"
          lazy
        />
      </button>
      <div class="flex">
        <button v-if="isSavedCard" @click="deleteCard(card.id)">
          <img
            class="icon"
            src="~/assets/images/icons/icon_delete.png"
            alt="Save card"
            lazy
          />
        </button>
        <button
          @click="
            isSavedCard
              ? editSavedCard(card.id, card.rarity.value, options, getPower)
              : saveCard(card.id, card.rarity.value, options, getPower)
          "
        >
          <img
            class="icon"
            src="~/assets/images/icons/icon_ok.png"
            alt="Save card"
            lazy
          />
        </button>
      </div>
    </div>
    <h1 class="text-center">
      {{ $t(`COMMON.${card.character.name}`) }} -
      {{ card[`name${$globalV.getLocalePostfix($i18n.locale)}`] }}
    </h1>
    <div class="grid grid-cols-2 gap-4">
      <table class="general-table edit-attribute-table">
        <tr>
          <td rowspan="6">
            <img
              class="large-icon m-auto"
              :src="card.thumbnail.url"
              :alt="card[`name${$globalV.getLocalePostfix($i18n.locale)}`]"
              lazy
            />
          </td>
          <td>{{ $t("COMMON.POWER") }}</td>
          <td>{{ getPower }}</td>
        </tr>
        <tr>
          <th>{{ $t("COMMON.RANK") }}</th>
          <td>
            <a-select
              :value="options.rank"
              dropdownClassName="custom-dropdown"
              @change="handleRankChange"
            >
              <a-select-option :value="1">1</a-select-option>
              <a-select-option :value="2">2</a-select-option>
              <a-select-option :value="3">3</a-select-option>
              <a-select-option :value="4">4</a-select-option>
              <a-select-option :value="5">5</a-select-option>
            </a-select>
          </td>
        </tr>
        <tr>
          <th>{{ $t("COMMON.LEVEL") }}</th>
          <td>{{ card.rarity.value === "R" ? 70 : 100 }}</td>
        </tr>
        <tr>
          <th>{{ $t("COMMON.RARITY") }}</th>
          <td>{{ card.rarity.value }}</td>
        </tr>
        <tr>
          <th>{{ $t("COMMON.INFLUENCE") }}</th>
          <td>{{ getInfluence }}</td>
        </tr>
        <tr>
          <th>{{ $t("COMMON.DEFENSE") }}</th>
          <td>{{ getDefense }}</td>
        </tr>
      </table>
      <table class="general-table edit-attribute-table">
        <tbody v-for="(skill, i) in card.skills" :key="i">
          <tr>
            <th rowspan="2">
              <NuxtLink
                :to="
                  localePath(
                    `/skills/${$globalV.nameToSlug(
                      skill[`name${$globalV.getLocalePostfix($i18n.locale)}`]
                    )}`
                  )
                "
                target="_blank"
              >
                <img
                  class="large-icon mx-auto"
                  :src="skill.skill_group.icon.url"
                  :alt="skill[`name${$globalV.getLocalePostfix($i18n.locale)}`]"
                  lazy
                />
              </NuxtLink>
            </th>
            <td>
              {{ skill[`name${$globalV.getLocalePostfix($i18n.locale)}`] }}
            </td>
            <td>
              <span>Lv</span>
              <a-select
                :value="options.skill1"
                dropdownClassName="custom-dropdown"
                @change="handleSkill1LvChange"
                v-if="i === 0"
              >
                <a-select-option v-for="n in 10" :value="n" :key="`${i}-${n}`">
                  {{ n }}
                </a-select-option>
              </a-select>
              <a-select
                :value="options.skill2"
                dropdownClassName="custom-dropdown"
                @change="handleSkill2LvChange"
                v-if="i === 1"
              >
                <a-select-option v-for="n in 10" :value="n" :key="`${i}-${n}`">
                  {{ n }}
                </a-select-option>
              </a-select>
              <a-select
                :value="options.skill3"
                dropdownClassName="custom-dropdown"
                @change="handleSkill3LvChange"
                v-if="i === 2"
              >
                <a-select-option v-for="n in 10" :value="n" :key="`${i}-${n}`">
                  {{ n }}
                </a-select-option>
              </a-select>
            </td>
          </tr>
          <tr>
            <td v-if="i === 0" colspan="2" class="px-1">
              {{ getSkill1Description }}
            </td>
            <td v-if="i === 1" colspan="2" class="px-1">
              {{ getSkill2Description }}
            </td>
            <td v-if="i === 2" colspan="2" class="px-1">
              {{ getSkill3Description }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditCardDesk",
  props: {
    card: Object,
    cardOptions: Object,
    isSavedCard: {
      type: Boolean,
      default: false,
    },
    goBack: Function,
    saveCard: Function,
    editSavedCard: Function,
    deleteCard: Function,
  },
  data() {
    return {
      options: {
        rank: 1,
        skill1: 1,
        skill2: 1,
        skill3: 1,
      },
    };
  },
  mounted() {
    if (this.cardOptions) {
      this.options = this.cardOptions;
    }
  },
  methods: {
    handleRankChange(value) {
      this.options.rank = value;
    },
    handleSkill1LvChange(value) {
      this.options.skill1 = value;
    },
    handleSkill2LvChange(value) {
      this.options.skill2 = value;
    },
    handleSkill3LvChange(value) {
      this.options.skill3 = value;
    },
    getAttributeWithRank(rank, attribute, rarity) {
      let ratio = 0.4;
      if (rank === 5) return attribute;
      if (rarity === "MR") ratio = 0.375;

      return Math.round(
        (attribute / (1 + ratio)) * (1 + (ratio / 4) * (rank - 1))
      );
    },
    getSkillNumber(lv1num, lv10num, lv) {
      return (
        Math.round(
          (lv1num + ((lv10num - lv1num) / 9) * (lv - 1) + Number.EPSILON) * 100
        ) / 100
      );
    },
    getSkillPower(skillLv, skillRank) {
      let base = 239;
      if (skillRank === "Ⅰ") {
        base = 191;
      } else if (skillRank === "Ⅲ") {
        base = 318;
      }
      return (0.5 + 0.5 * skillLv) * base;
    },
  },
  computed: {
    getSkill1Description: function () {
      const number = this.$globalV.getSkillNumber(
        this.card.skills[0].number.lv1,
        this.card.skills[0].number.lv10,
        this.options.skill1
      );
      let description =
        this.card.skills[0].skill_group[
          `description${this.$globalV.getLocalePostfix(this.$i18n.locale)}`
        ];
      if (this.card.skills[0].variant) {
        let v = 1;
        if (this.card.skills[0].variant === "β") {
          v = 2;
        } else if (this.card.skills[0].variant === "γ") {
          v = 3;
        }
        description = description.replace("Z", v);
      }
      return description.replace("X", number);
    },
    getSkill2Description: function () {
      const number = this.$globalV.getSkillNumber(
        this.card.skills[1].number.lv1,
        this.card.skills[1].number.lv10,
        this.options.skill2
      );
      let description =
        this.card.skills[1].skill_group[
          `description${this.$globalV.getLocalePostfix(this.$i18n.locale)}`
        ];
      return description.replace("X", number);
    },
    getSkill3Description: function () {
      const number = this.$globalV.getSkillNumber(
        this.card.skills[2].number.lv1,
        this.card.skills[2].number.lv10,
        this.options.skill3
      );
      let description =
        this.card.skills[2].skill_group[
          `description${this.$globalV.getLocalePostfix(this.$i18n.locale)}`
        ];
      return description.replace("X", number);
    },
    getInfluence: function () {
      return this.getAttributeWithRank(
        this.options.rank,
        this.card.influence,
        this.card.rarity.value
      );
    },
    getDefense: function () {
      return this.getAttributeWithRank(
        this.options.rank,
        this.card.defense,
        this.card.rarity.value
      );
    },
    getSkill1Power: function () {
      return this.getSkillPower(this.options.skill1, this.card.skills[0].rank);
    },
    getSkill2Power: function () {
      return this.getSkillPower(this.options.skill2, this.card.skills[1].rank);
    },
    getSkill3Power: function () {
      return this.card.rarity.value === "R"
        ? 0
        : this.getSkillPower(this.options.skill3, this.card.skills[2].rank);
      // return 0;
    },
    getPower: function () {
      return Math.round(
        this.getInfluence +
          this.getDefense +
          this.getSkill1Power +
          this.getSkill2Power +
          this.getSkill3Power
      );
    },
  },
};
</script>

<style lang="scss">
.edit-attribute-table {
  .ant-select {
    width: 60px;
  }
}
</style>
