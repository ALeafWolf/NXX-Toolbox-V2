const qs = require("qs");

export default function ({ $axios, store, app }) {
  $axios.defaults.paramsSerializer = (params) => {
    return qs.stringify(params);
  };
}
