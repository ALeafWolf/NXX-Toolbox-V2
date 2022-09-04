const global = {
  ihs: "https://aleafwolf.github.io/IHS/TOT/",
  emailRegex:
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  getDesWithRound: (description, variant) => {
    if (description) {
      if (variant) {
        let r = 1;
        switch (variant) {
          case "α":
            r = 1;
            break;
          case "β":
            r = 2;
            break;
          case "γ":
            r = 3;
            break;
        }
        return description.replace("Z", r);
      } else {
        return description;
      }
    } else {
      return "";
    }
  },
};

// const getDesWithRound = (description, variant) => {
//   if (description) {
//     if (variant) {
//       let r = 1;
//       switch (variant) {
//         case "α":
//           r = 1;
//           break;
//         case "β":
//           r = 2;
//           break;
//         case "γ":
//           r = 3;
//           break;
//       }
//       return description.replace("Z", r);
//     } else {
//       return description;
//     }
//   } else {
//     return "";
//   }
// };

export default ({ app }, inject) => {
  inject("globalV", global);
};
