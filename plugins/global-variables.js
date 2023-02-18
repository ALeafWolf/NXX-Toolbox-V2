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
  nameToSlug: (name) => {
    if (typeof name === "string") {
      const words = name.split(" ");
      for (let i = 0; i < words.length; i++) {
        if (
          words[i] !== "Ⅰ" &&
          words[i] !== "Ⅱ" &&
          words[i] !== "Ⅲ" &&
          words[i] !== "α" &&
          words[i] !== "β" &&
          words[i] !== "γ"
        ) {
          words[i] = words[i].toLowerCase();
        }
      }
      return words.join("-");
    }
    return "";
  },
  isCapitalizable: (string) => {
    return string;
  },
  slugToName: (slug, locale) => {
    if (slug === undefined) return "";
    if (locale === "cn") return slug;
    let splits = slug.split("-");
    const isCapitalizable = (string) => {
      const words = [
        "a",
        "and",
        "as",
        "at",
        "but",
        "by",
        "for",
        "from",
        "if",
        "in",
        "into",
        "that",
        "the",
        "nor",
        "of",
        "on",
        "or",
        "to",
        "α",
        "β",
        "γ",
      ];
      let bool = true;
      words.forEach((w) => {
        if (w === string) {
          bool = false;
        }
      });
      return bool;
    };
    for (let i = 0; i < splits.length; i++) {
      if (!isCapitalizable(splits[i]) && i !== 0) {
        splits[i] = splits[i];
      } else {
        splits[i] = splits[i].charAt(0).toUpperCase() + splits[i].slice(1);
      }
    }
    const name = splits.join(" ");
    return name;
  },
  getLocalePostfix: (locale) => {
    return locale === "zh" ? "" : `_${locale}`;
  },
  getSkillNumber(lv1num, lv10num, lv) {
    return (
      Math.round(
        (lv1num + ((lv10num - lv1num) / 9) * (lv - 1) + Number.EPSILON) * 100
      ) / 100
    );
  },
};

export default ({ app }, inject) => {
  inject("globalV", global);
};
