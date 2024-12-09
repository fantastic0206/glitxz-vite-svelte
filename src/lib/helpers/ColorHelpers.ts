import type { ColorString } from "$lib/types/color";

export class ColorHelpers {
  /**
   * Gets yah the css from a css colol variable of @type {ColorString}
   * @param param 
   * @returns css for use with border and background in the inline styles
   */
  static PropToCss = (param: ColorString): string => {return `var(--${param})`};
}