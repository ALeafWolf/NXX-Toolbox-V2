<template>
  <div class="h-full">
    <section class="base-panel p-4 mb-4">
      <div class="mb-4">
        <a-input-search
          :placeholder="$t('CARD-ACQUISITION.SEARCH-BY-NAME')"
          size="large"
          @search="handleNameChange"
        />
      </div>
      <div class="grid grid-cols-3 gap-4">
        <div>
          <h3 class="text-lg">
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
          </a-select>
        </div>
        <div>
          <h3 class="text-lg">
            {{ $t("COMMON.ATTRIBUTE") }}
          </h3>
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
          <h3 class="text-lg">
            {{ $t("COMMON.RARITY") }}
          </h3>
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
      </div>
    </section>
    <section class="grid grid-cols-5 gap-6 overflow-y-scroll h-full">
      <CardGridItem
        v-for="(card, i) in cards"
        :key="i"
        :card="card"
        :onClick="onClick"
      />
    </section>
  </div>
</template>

<script>
export default {
  name: "AddCardDesk",
  props: {
    cards: {
      type: Array,
      default() {
        return [];
      },
    },
    handleNameChange: Function,
    handleCharacterChange: Function,
    handleAttributesChange: Function,
    handleRaritiesChange: Function,
    onClick: Function,
  },
};
</script>
