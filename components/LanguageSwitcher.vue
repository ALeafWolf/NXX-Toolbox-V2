<template>
  <section>
    <a-icon type="global" :style="{ fontSize: '30px', marginRight: '10px' }" />
    <a-radio-group v-model="lang" @change="switchLanguage">
      <a-radio-button value="zh"> 中文 </a-radio-button>
      <a-radio-button value="en"> English </a-radio-button>
      <a-radio-button value="ko"> 한국인 </a-radio-button>
    </a-radio-group>
  </section>
</template>

<script>
export default {
  data() {
    return {
      lang: "zh",
    };
  },
  methods: {
    switchLanguage(e){
        
    }
  }
};
</script>
