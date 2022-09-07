<template>
  <section class="h-full grid gap-5 grid-cols-5">
    <div class="col-span-3 grid gap-5">
      <div class="sub-panel flex flex-col items-center justify-center p-3">
        <h2>{{ $t("NAV.CARD-LIST") }}</h2>
        <table class="w-full text-center">
          <tbody>
            <tr>
              <th>{{ $t("COMMON.CHARACTER") }}</th>
              <td>
                <a-radio-group v-model="filters.character">
                  <a-radio-button value="LUKE">
                    <img
                      class="icon"
                      src="~/assets/images/夏彦.webp"
                      alt="夏彦"
                    />
                  </a-radio-button>
                  <a-radio-button value="ARTEM">
                    <img
                      class="icon"
                      src="~/assets/images/左然.webp"
                      alt="左然"
                    />
                  </a-radio-button>
                  <a-radio-button value="VYN">
                    <img
                      class="icon"
                      src="~/assets/images/莫弈.webp"
                      alt="莫弈"
                    />
                  </a-radio-button>
                  <a-radio-button value="MARIUS">
                    <img
                      class="icon"
                      src="~/assets/images/陆景和.webp"
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
                <a-input-number
                  class="text-center"
                  v-for="i in 3"
                  :key="`skillLv-${i}`"
                  v-model="filters.skillLv[i - 1]"
                  :min="1"
                  :max="10"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="grid grid-cols-5 gap-5">
        <div
          class="sub-panel col-span-3 flex flex-col items-center justify-center"
        >
          <h2>{{ $t("COMMON.EXPCHIP") }}</h2>
          <table class="text-center">
            <tbody>
              <tr>
                <td v-for="i in options.expChips.ranks" :key="`Expchip-${i}`">
                  <img
                    class="medium-icon"
                    :src="require(`~/assets/images/rss/法理之谕 ${i}.webp`)"
                    :alt="`法理之谕 ${i}`"
                  />
                </td>
              </tr>
              <tr>
                <td v-for="i in 4" :key="`ExpchipNum-${i}`">
                  <a-input-number v-model="filters.expChips[i - 1]" :min="0" />
                </td>
              </tr>
              <tr>
                <td
                  v-for="(chip, i) in results.usedExpChips"
                  :key="`usedchip-${i}`"
                >
                  {{ chip }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="col-span-2 sub-panel flex flex-col items-center justify-center"
        >
          <table class="w-full text-center">
            <tbody>
              <tr>
                <th colspan="3">{{ $t("RSS-CALC.CARD-LEVEL-MATERIAL") }}</th>
              </tr>
              <tr>
                <td>{{ $t("RSS-CALC.REQUIRED-EXP") }}</td>
                <td colspan="2">{{ requiredExp }}</td>
              </tr>
              <tr>
                <td colspan="3">{{ $t("RSS-CALC.ACTUAL-COST") }}</td>
              </tr>
              <tr>
                <td>
                  {{ $t("COMMON.LEVEL") }}
                </td>
                <td>
                  {{ $t("COMMON.EXP") }}
                </td>
                <td>
                  <img
                    class="icon"
                    src="~/assets/images/icons/btn_coin_s.png"
                  />
                </td>
              </tr>
              <tr>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="col-span-2 grid gap-5">
      <table class="sub-panel w-full text-center">
        <tbody>
          <tr>
            <th colspan="3">{{ $t("RSS-CALC.EVOLVE-RSS") }}</th>
          </tr>
          <tr>
            <td>
              <img
                class="icon m-auto"
                src="~/assets/images/icons/btn_coin_s.png"
              />
            </td>
            <td colspan="2">0</td>
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
            <td>0</td>
            <td>0</td>
            <td>0</td>
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
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>
      <table class="sub-panel w-full text-center">
        <tbody>
          <tr>
            <th colspan="3">{{ $t("RSS-CALC.SKILL-LV-RSS") }}</th>
          </tr>
          <tr>
            <td>
              <img
                class="icon m-auto"
                src="~/assets/images/icons/btn_coin_s.png"
              />
            </td>
            <td colspan="2">0</td>
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
            <td>0</td>
            <td>0</td>
            <td>0</td>
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
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import skillRss from "~/assets/data/skill-level-up-rss.json";
import cardExp from "~/assets/data/card-exp.json";

export default {
  async asyncData() {
    return { cardExp, skillRss };
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
      results: {
        usedExpChips: [0, 0, 0, 0],
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
    requiredExp: function () {
      const lv1 = this.filters.lv[0];
      const lv2 = this.filters.lv[1];
      const lowLv = lv1 <= lv2 ? lv1 : lv2;
      const highLv = lv1 > lv2 ? lv1 : lv2;

      let exp = 0;
      for(let i = lowLv - 1; i < highLv - 1; i++){
        exp += this.cardExp[this.filters.rarity][i];
      }
      return exp;
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
