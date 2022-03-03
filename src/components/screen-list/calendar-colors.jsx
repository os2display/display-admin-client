import * as am4core from "@amcharts/amcharts4/core";

/** @param {object} target The colorsset */
function Am4ThemesColorTheme(target) {
  if (target instanceof am4core.ColorSet) {
    // Thanks to https://colorbrewer2.org/ for creating a
    // colorblind-friendly palette.
    const list = [
      am4core.color("#d73027"),
      am4core.color("#f46d43"),
      am4core.color("#fdae61"),
      am4core.color("#fee090"),
      am4core.color("#ffffbf"),
      am4core.color("#e0f3f8"),
      am4core.color("#abd9e9"),
      am4core.color("#74add1"),
      am4core.color("#4575b4"),
      am4core.color("#313695"),
    ];
    // eslint-disable-next-line
    target.list = list;
  }
}

export default Am4ThemesColorTheme;
