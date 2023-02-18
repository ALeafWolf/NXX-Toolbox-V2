<template>
  <section class="h-full grid gap-5 lg:grid-cols-5">
    <div class="col-span-1 lg:col-span-3 grid gap-5">
      <div class="sub-panel flex flex-col items-center justify-center p-3">
        <h2>{{ $t("NAV.CARD-LIST") }}</h2>
        <table class="w-full text-center card-table">
          <tbody>
            <tr>
              <th>{{ $t("COMMON.CHARACTER") }}</th>
              <td>
                <a-radio-group v-model="filters.character">
                  <a-radio-button value="LUKE">
                    <img
                      class="icon"
                      src="~/assets/images/LUKE.webp"
                      alt="夏彦"
                    />
                  </a-radio-button>
                  <a-radio-button value="ARTEM">
                    <img
                      class="icon"
                      src="~/assets/images/ARTEM.webp"
                      alt="左然"
                    />
                  </a-radio-button>
                  <a-radio-button value="VYN">
                    <img
                      class="icon"
                      src="~/assets/images/VYN.webp"
                      alt="莫弈"
                    />
                  </a-radio-button>
                  <a-radio-button value="MARIUS">
                    <img
                      class="icon"
                      src="~/assets/images/MARIUS.webp"
                      alt="陆景和"
                    />
                  </a-radio-button>
                </a-radio-group>
              </td>
            </tr>
            <tr>
              <th>{{ $t("COMMON.ATTRIBUTE") }}</th>
              <td>
                <a-radio-group v-model="filters.attribute">
                  <a-radio-button value="LOGIC">
                    <img
                      class="icon"
                      src="~/assets/images/LOGIC.png"
                      alt="LOGIC"
                    />
                  </a-radio-button>
                  <a-radio-button value="EMPATHY">
                    <img
                      class="icon"
                      src="~/assets/images/EMPATHY.png"
                      alt="EMPATHY"
                    />
                  </a-radio-button>
                  <a-radio-button value="INTUITION">
                    <img
                      class="icon"
                      src="~/assets/images/INTUITION.png"
                      alt="INTUITION"
                    />
                  </a-radio-button>
                </a-radio-group>
              </td>
            </tr>
            <tr>
              <th>{{ $t("COMMON.RARITY") }}</th>
              <td>
                <a-radio-group v-model="filters.rarity">
                  <a-radio-button value="R">
                    <h1>R</h1>
                  </a-radio-button>
                  <a-radio-button value="MR">
                    <h1>MR</h1>
                  </a-radio-button>
                  <a-radio-button value="SR">
                    <h1>SR</h1>
                  </a-radio-button>
                  <a-radio-button value="SSR">
                    <h1>SSR</h1>
                  </a-radio-button>
                </a-radio-group>
              </td>
            </tr>
            <tr>
              <th>{{ $t("COMMON.LEVEL") }}</th>
              <td>
                <a-slider
                  range
                  :default-value="[1, 50]"
                  :min="1"
                  :max="maxLevel"
                  @change="onLvChange"
                />
              </td>
            </tr>
            <tr>
              <th>{{ $t("RSS-CALC.SKILL-LEVEL") }}</th>
              <td>
                <div class="grid grid-cols-3 gap-2">
                  <a-input-number
                    class="text-center"
                    v-for="i in 3"
                    :key="`skillLv-${i}`"
                    v-model="filters.skillLv[i - 1]"
                    :min="1"
                    :max="10"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div
          class="sub-panel col-span-1 md:col-span-2 flex flex-col items-center justify-center p-3"
        >
          <h2>{{ $t("COMMON.EXPCHIP") }}</h2>
          <table class="text-center">
            <tbody>
              <tr>
                <td v-for="i in options.expChips.ranks" :key="`Expchip-${i}`">
                  <img
                    class="medium-icon mx-auto"
                    :src="require(`~/assets/images/rss/法理之谕 ${i}.webp`)"
                    :alt="`法理之谕 ${i}`"
                  />
                </td>
              </tr>
              <tr>
                <td class="px-1" v-for="i in 4" :key="`ExpchipNum-${i}`">
                  <a-input-number v-model="filters.expChips[i - 1]" :min="0" />
                </td>
              </tr>
              <tr>
                <td v-for="(chip, i) in usedExpChips" :key="`usedchip-${i}`">
                  {{ chip }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="col-span-1 md:col-span-2 sub-panel flex flex-col items-center justify-center p-3"
        >
          <h2>{{ $t("RSS-CALC.CARD-LEVEL-MATERIAL") }}</h2>
          <table class="w-full text-center">
            <tbody>
              <tr>
                <th>{{ $t("RSS-CALC.REQUIRED-EXP") }}</th>
                <td colspan="2">{{ requiredExp }}</td>
              </tr>
              <tr>
                <th colspan="3">{{ $t("RSS-CALC.ACTUAL-COST") }}</th>
              </tr>
              <tr>
                <th>
                  {{ $t("COMMON.LEVEL") }}
                </th>
                <th>
                  {{ $t("COMMON.EXP") }}
                </th>
                <td>
                  <img
                    class="icon m-auto"
                    src="~/assets/images/icons/icon_coin_s.png"
                  />
                </td>
              </tr>
              <tr>
                <td>{{ actualLv }}</td>
                <td>{{ actualExp }}</td>
                <td>{{ expChipCoin }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="col-span-1 lg:col-span-2 grid gap-5">
      <div
        class="sub-panel p-3 text-center flex flex-col items-center justify-center"
      >
        <h2>{{ $t("RSS-CALC.EVOLVE-RSS") }}</h2>
        <table class="w-full">
          <tbody>
            <tr>
              <td>
                <img
                  class="icon m-auto"
                  src="~/assets/images/icons/icon_coin_s.png"
                />
              </td>
              <td colspan="2">{{ this.cardEvolveRss.coin }}</td>
            </tr>
            <tr>
              <td>
                <img
                  class="icon m-auto"
                  :src="
                    require(`~/assets/images/rss/${translateAttribute}晶片 Ⅰ.webp`)
                  "
                  :alt="`${translateAttribute}晶片 Ⅰ`"
                />
              </td>
              <td>
                <img
                  class="icon m-auto"
                  :src="
                    require(`~/assets/images/rss/${translateAttribute}晶片 Ⅱ.webp`)
                  "
                  :alt="`${translateAttribute}晶片 Ⅱ`"
                />
              </td>
              <td>
                <img
                  class="icon m-auto"
                  :src="
                    require(`~/assets/images/rss/${translateAttribute}晶片 Ⅲ.webp`)
                  "
                  :alt="`${translateAttribute}晶片 Ⅲ`"
                />
              </td>
            </tr>
            <tr>
              <td>{{ this.cardEvolveRss.chip[0] }}</td>
              <td>{{ this.cardEvolveRss.chip[1] }}</td>
              <td>{{ this.cardEvolveRss.chip[2] }}</td>
            </tr>
            <tr>
              <td>
                <img
                  class="icon m-auto"
                  :src="
                    require(`~/assets/images/rss/${translateCharacter}晶片 Ⅰ.webp`)
                  "
                  :alt="`${translateCharacter}晶片 Ⅰ`"
                />
              </td>
              <td>
                <img
                  class="icon m-auto"
                  :src="
                    require(`~/assets/images/rss/${translateCharacter}晶片 Ⅱ.webp`)
                  "
                  :alt="`${translateCharacter}晶片 Ⅱ`"
                />
              </td>
              <td>
                <img
                  class="icon m-auto"
                  :src="
                    require(`~/assets/images/rss/${translateCharacter}晶片 Ⅲ.webp`)
                  "
                  :alt="`${translateCharacter}晶片 Ⅲ`"
                />
              </td>
            </tr>
            <tr>
              <td>{{ this.cardEvolveRss.charChip[0] }}</td>
              <td>{{ this.cardEvolveRss.charChip[1] }}</td>
              <td>{{ this.cardEvolveRss.charChip[2] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="sub-panel text-center p-3 flex flex-col items-center justify-center"
      >
        <h2>{{ $t("RSS-CALC.SKILL-LV-RSS") }}</h2>
        <table class="w-full">
          <tbody>
            <tr>
              <td>
                <img
                  class="icon m-auto"
                  src="~/assets/images/icons/icon_coin_s.png"
                />
              </td>
              <td colspan="2">{{calculatedSkillRss.coin}}</td>
            </tr>
            <tr>
              <td>
                <img
                  class="icon m-auto"
                  :src="
                    require(`~/assets/images/rss/${translateAttribute}印象 Ⅰ.webp`)
                  "
                  :alt="`${translateAttribute}印象 Ⅰ`"
                />
              </td>
              <td>
                <img
                  class="icon m-auto"
                  :src="
                    require(`~/assets/images/rss/${getCharacterSkillMaterial[0]}.webp`)
                  "
                  :alt="getCharacterSkillMaterial[0]"
                />
              </td>
              <td>
                <img
                  class="icon m-auto"
                  :src="
                    require(`~/assets/images/rss/${getCharacterSkillMaterial[1]}.webp`)
                  "
                  :alt="getCharacterSkillMaterial[1]"
                />
              </td>
            </tr>
            <tr>
              <td>{{calculatedSkillRss.impression[0]}}</td>
              <td>{{calculatedSkillRss.rss[0]}}</td>
              <td>{{calculatedSkillRss.rss[0]}}</td>
            </tr>
            <tr>
              <td>
                <img
                  class="icon m-auto"
                  :src="
                    require(`~/assets/images/rss/${translateAttribute}印象 Ⅱ.webp`)
                  "
                  :alt="`${translateAttribute}印象 Ⅱ`"
                />
              </td>
              <td>
                <img
                  class="icon m-auto"
                  :src="
                    require(`~/assets/images/rss/${getCharacterSkillMaterial[2]}.webp`)
                  "
                  :alt="getCharacterSkillMaterial[2]"
                />
              </td>
              <td>
                <img
                  class="icon m-auto"
                  :src="
                    require(`~/assets/images/rss/${getCharacterSkillMaterial[3]}.webp`)
                  "
                  :alt="getCharacterSkillMaterial[3]"
                />
              </td>
            </tr>
            <tr>
              <td>{{calculatedSkillRss.impression[1]}}</td>
              <td>{{calculatedSkillRss.rss[1]}}</td>
              <td>{{calculatedSkillRss.rss[1]}}</td>
            </tr>
            <tr>
              <td>
                <img
                  class="icon m-auto"
                  :src="
                    require(`~/assets/images/rss/${translateAttribute}印象 Ⅲ.webp`)
                  "
                  :alt="`${translateAttribute}印象 Ⅲ`"
                />
              </td>
              <td>
                <img
                  class="icon m-auto"
                  :src="
                    require(`~/assets/images/rss/${getCharacterSkillMaterial[4]}.webp`)
                  "
                  :alt="getCharacterSkillMaterial[4]"
                />
              </td>
              <td>
                <img
                  class="icon m-auto"
                  :src="
                    require(`~/assets/images/rss/${getCharacterSkillMaterial[5]}.webp`)
                  "
                  :alt="getCharacterSkillMaterial[5]"
                />
              </td>
            </tr>
            <tr>
              <td>{{calculatedSkillRss.impression[2]}}</td>
              <td>{{calculatedSkillRss.rss[2]}}</td>
              <td>{{calculatedSkillRss.rss[2]}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import skillRss from "~/assets/data/skill-level-up-rss.json";
import cardExp from "~/assets/data/card-exp.json";
import cardEvolve from "~/assets/data/card-evolve-rss.json";

export default {
  async asyncData() {
    return { cardExp, skillRss, cardEvolve };
  },
  data() {
    return {
      filters: {
        character: "LUKE",
        attribute: "LOGIC",
        rarity: "R",
        lv: [1, 50],
        skillLv: [1, 1, 1],
        expChips: [99, 99, 99, 99],
      },
      options: {
        expChips: {
          ranks: ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ"],
          values: [450, 1500, 4500, 15000],
          costs: [45, 150, 450, 1500],
        },
        skillMaterial: [
          [
            "广角镜头",
            "袋装无花果干",
            "多用军刀",
            "分装药盒",
            "智能眼镜",
            "外文诗集",
          ],
          [
            "钢笔",
            "平板电脑",
            "领带夹",
            "蓝宝石袖扣",
            "手枪模型",
            "高级律师徽章",
          ],
          ["黑胶唱片", "木柄花铲", "录音笔", "怀表", "烫金扑克牌", "陶艺茶杯"],
          ["油画工具", "积木零件", "压感笔", "蓝牙耳机", "耳钉", "权限秘钥"],
        ],
      },
    };
  },
  computed: {
    maxLevel: function () {
      return this.filters.rarity === "R" ? 70 : 100;
    },
    translateAttribute: function () {
      switch (this.filters.attribute) {
        case "LOGIC":
          return "逻辑";
        case "EMPATHY":
          return "共情";
        case "INTUITION":
          return "直觉";
      }
    },
    translateCharacter: function () {
      switch (this.filters.character) {
        case "LUKE":
          return "思维";
        case "ARTEM":
          return "均衡";
        case "VYN":
          return "心灵";
        case "MARIUS":
          return "无限";
      }
    },
    getCharacterSkillMaterial: function () {
      switch (this.filters.character) {
        case "LUKE":
          return this.options.skillMaterial[0];
        case "ARTEM":
          return this.options.skillMaterial[1];
        case "VYN":
          return this.options.skillMaterial[2];
        case "MARIUS":
          return this.options.skillMaterial[3];
      }
    },
    orderedLvs: function () {
      const lv1 = this.filters.lv[0];
      const lv2 = this.filters.lv[1];
      const lowLv = lv1 <= lv2 ? lv1 : lv2;
      const highLv = lv1 > lv2 ? lv1 : lv2;
      return { lowLv, highLv };
    },
    requiredExp: function () {
      const lowLv = this.orderedLvs.lowLv;
      const highLv = this.orderedLvs.highLv;
      let exp = 0;
      for (let i = lowLv - 1; i < highLv - 1; i++) {
        exp += this.cardExp[this.filters.rarity][i];
      }
      return exp;
    },
    usedExpChips: function () {
      let expReminder = this.requiredExp;
      const chips = [0, 0, 0, 0];
      const remainChips = [];

      for (let i = 3; i >= 0; i--) {
        if (
          this.filters.expChips[i] * this.options.expChips.values[i] <
          expReminder
        ) {
          chips[i] = this.filters.expChips[i];
        } else {
          chips[i] = Math.floor(expReminder / this.options.expChips.values[i]);
          if (chips[i] < this.filters.expChips[i]) {
            remainChips.push(i);
          }
        }
        expReminder -= chips[i] * this.options.expChips.values[i];
      }
      // deal with remaining exp
      if (expReminder > 0 && remainChips.length > 0) {
        let chip = -1;
        for (let i = 0; i < remainChips.length; i++) {
          let index = remainChips[i];
          if (expReminder <= this.options.expChips.values[index]) {
            chip = index;
          }
        }
        if (chip != -1) {
          chips[chip] += 1;
        }
      }
      return chips;
    },
    actualExp: function () {
      let exp = 0;
      for (let i = 0; i < this.usedExpChips.length; i++) {
        exp += this.usedExpChips[i] * this.options.expChips.values[i];
      }
      return exp;
    },
    actualLv: function () {
      let exp = this.actualExp;
      if (exp === 0) return 1;
      const expStep = this.cardExp[this.filters.rarity];
      let i = this.orderedLvs.lowLv - 1;
      while (exp > 0 && i < this.orderedLvs.highLv) {
        exp -= expStep[i++];
      }
      return i;
    },
    expChipCoin: function () {
      let coin = 0;
      for (let i = 0; i < 4; i++) {
        coin += this.options.expChips.costs[i] * this.usedExpChips[i];
      }
      return coin;
    },
    cardEvolveRss: function () {
      const evolveRssList = this.cardEvolve[this.filters.rarity].rss;
      const evolveRss = {
        coin: 0,
        chip: [0, 0, 0],
        charChip: [0, 0, 0],
      };
      for (let o = 0; o < evolveRssList.length; o++) {
        let data = evolveRssList[o];
        if (
          data.lv >= this.orderedLvs.lowLv &&
          data.lv <= this.orderedLvs.highLv
        ) {
          evolveRss.coin += parseInt(data.coin);
          let i = 1;
          let j = 2;
          let c = 0;
          if (data.lv === 40) {
            i = 0;
            j = 1;
            if (this.filters.rarity === "SR" || this.filters.rarity === "SSR")
              c = 1;
          }
          if (data.lv === 70) c = 2;
          evolveRss.chip[i] += parseInt(data.chip1);
          evolveRss.chip[j] += parseInt(data.chip2);
          evolveRss.charChip[c] += parseInt(data.charChip);
        }
      }
      return evolveRss;
    },
    calculatedSkillRss: function () {
      let coin = 0;
      const rss = [0, 0, 0];
      const impression = [0, 0, 0];
      const rssList = this.skillRss[this.filters.rarity];

      for (let i = 0; i < this.filters.skillLv.length; i++) {
        const lv = this.filters.skillLv[i];
        if (lv > 1) {
          //lv2: index 0, lv10: index 8
          for (let j = 0; j < lv - 1; j++) {
            coin += rssList[j].coin;
            //lv2-4
            if (j < 3) {
              impression[0] += rssList[j].impression;
              rss[0] += rssList[j].item;
            }
            //lv5-7
            else if (j < 6) {
              impression[1] += rssList[j].impression;
              rss[1] += rssList[j].item;
            }
            //lv8-10
            else {
              impression[2] += rssList[j].impression;
              rss[2] += rssList[j].item;
            }
          }
        }
      }

      return { coin, rss, impression };
    },
  },
  methods: {
    onLvChange(value) {
      this.filters.lv = value;
    },
  },
  head() {
    return {
      title: `${this.$t("NAV.CARD-RSS-CALC")} - ${this.$t(
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
};
</script>

<style lang="scss" scoped>
h2 {
  font-weight: 700;
  font-size: 18px;
}
.card-table {
  td {
    padding: 5px 20px;
  }
}
</style>
