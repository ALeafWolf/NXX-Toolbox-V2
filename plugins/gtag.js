import Vue from "vue";
import VueGtag from "vue-gtag";

Vue.use(VueGtag, {
  config: { id: "G-JX8MY3VB1F", enable: process.env.NODE_ENV === "production" },
});
