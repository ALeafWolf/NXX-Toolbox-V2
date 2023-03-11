<template>
  <section>
    <!-- <h1 class="text-center">
      {{ $t(`COMMON.${card.character.name}`) }} -
      {{ card[`name${$globalV.getLocalePostfix($i18n.locale)}`] }}
    </h1> -->
    <div
      class="p-4 base-panel mb-10"
      :class="
        card.is_horizontal_img ? 'horizontal-card-section' : 'card-section'
      "
    >
      <a-tabs
        v-if="card.images"
        type="card"
        class="custom-card-tab"
        :forceRender="true"
      >
        <a-tab-pane
          class="tab-content"
          v-for="(image, i) in card.images"
          :key="`image-${i}`"
          :tab="i + 1"
        >
          <img
            class="img-fluid"
            :src="image.url"
            :alt="`${card.name}-${i + 1}`"
          />
        </a-tab-pane>
      </a-tabs>
      <div v-else>
        <img :src="getImgUrl" :alt="card.name" />
      </div>
      <div class="info-block">
        <table class="general-table w-full mb-2">
          <thead>
            <tr>
              <th colspan="2">{{ $t(`COMMON.NAME`) }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>中文</th>
              <td>{{ card.name }}</td>
            </tr>
            <tr v-if="card.is_release_in_global">
              <th>English</th>
              <td>{{ card.name_en }}</td>
            </tr>
            <tr v-if="card.is_release_in_global">
              <th>한국인</th>
              <td>{{ card.name_ko }}</td>
            </tr>
          </tbody>
        </table>
        <table class="general-table w-full">
          <thead>
            <tr>
              <th colspan="2">{{ $t("COMMON.BASIC-INFO") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{{ $t("COMMON.CHARACTER") }}</th>
              <td>{{ $t(`COMMON.${card.character.name}`) }}</td>
            </tr>
            <tr>
              <th>{{ $t("COMMON.RARITY") }}</th>
              <td>{{ card.rarity.value }}</td>
            </tr>
            <tr>
              <th>{{ $t("COMMON.LEVEL") }}</th>
              <td>100</td>
            </tr>
            <tr>
              <th>{{ $t("COMMON.RANK") }}</th>
              <td>5</td>
            </tr>
            <tr>
              <th>{{ $t("COMMON.ATTRIBUTE") }}</th>
              <td>
                <img
                  class="icon inline"
                  :src="require(`assets/images/${card.attribute}.png`)"
                  :alt="card.attribute"
                />
                {{ $t(`COMMON.${card.attribute}`) }}
              </td>
            </tr>
            <tr>
              <th>{{ $t("COMMON.INFLUENCE") }}</th>
              <td>{{ card.influence }}</td>
            </tr>
            <tr>
              <th>{{ $t("COMMON.DEFENSE") }}</th>
              <td>{{ card.defense }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <table class="general-table skill-block">
        <thead>
          <tr>
            <th colspan="2">{{ $t("COMMON.SKILL") }}</th>
          </tr>
        </thead>
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
              >
                <img
                  class="large-icon mx-auto"
                  :src="skill.skill_group.icon.url"
                  :alt="skill[`name${$globalV.getLocalePostfix($i18n.locale)}`]"
                />
              </NuxtLink>
            </th>
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
                {{ skill[`name${$globalV.getLocalePostfix($i18n.locale)}`] }}
              </NuxtLink>
            </td>
          </tr>
          <tr>
            <td>
              {{ getSkillDescription(skill) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <AcquisitionTable
      :entries="card.card_acquisitions"
      :locale="$i18n.locale"
    />
  </section>
</template>
<script>
export default {
  name: "CardDetailPage",
  data() {
    return {
      imgUrl: this.$globalV.ihs,
      urls: ["weibo", "bilibili", "twitter", "youtube"],
    };
  },
  async asyncData({ $axios, app, route }) {
    const name = app.$globalV.slugToName(route.params.slug, app.i18n.locale);
    const card = await $axios
      .$get(`/api/card/detail/${encodeURIComponent(name)}`)
      .catch((error) => {
        console.log(error);
      });
    return {
      card,
    };
  },
  methods: {
    getSkillDescription(skill) {
      const number = this.$globalV.getSkillNumber(
        skill.number.lv1,
        skill.number.lv10,
        10
      );
      let description =
        skill.skill_group[
          `description${this.$globalV.getLocalePostfix(this.$i18n.locale)}`
        ];
      if (skill.variant) {
        let v = 1;
        if (skill.variant === "β") {
          v = 2;
        } else if (skill.variant === "γ") {
          v = 3;
        }
        description = description.replace("Z", v);
      }
      return description.replace("X", number);
    },
  },
  computed: {
    getImgUrl: function () {
      return this.card.images
        ? this.card.images[0].url
        : `${this.$globalV.ihs + this.card.character.name}/${
            this.card.name
          }-full.webp`;
    },
  },
  head() {
    return {
      title: `${this.$t("COMMON.CARD")}: ${this.card.name} | ${this.$t(
        "COMMON.TITLE-POSTFIX"
      )}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.$t("COMMON.CARD")}: ${this.card.name} | ${this.$t(
            "COMMON.TITLE-POSTFIX"
          )}`,
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.card-section {
  display: grid;
  grid-template-columns: 250px 1fr 2fr;
  gap: 30px;
}
.info-block {
  display: grid;
  gap: 30px;
}
.horizontal-card-section {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 60px;
  .custom-card-tab {
    grid-column: span 2 / span 2;
  }
}

.skill-row {
  display: grid;
  grid-template-columns: 50px auto;
  gap: 10px;
}
.tab-content {
  background-color: rgba(0, 0, 0, 0.5);
}
@media all and (max-width: $xl) {
  .card-section {
    grid-template-columns: 250px 1fr;
    .skill-block {
      grid-column: 1 / span 2;
    }
  }
}
@media all and (max-width: $lg) {
  .horizontal-card-section {
    gap: 60px 30px;
  }
}
@media all and (max-width: $md) {
  .horizontal-card-section {
    gap: 30px;
  }
  .card-section {
    grid-template-columns: 1fr 1fr;
  }
  .info-block {
    gap: 15px;
  }
}
@media all and (max-width: $sm) {
  .horizontal-card-section {
    grid-template-columns: 1fr;
    .custom-card-tab {
      grid-column: span 1 / span 1;
    }
  }
}
</style>
