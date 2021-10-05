import abab from "abab";
import lodash from "lodash";

declare var global: any;

global.library = {
  load: function (name: string): any {
    switch (name) {
      default: {
        throw new Error(`Unsupported library to load: '${name}'`);
      }
      case "abab": {
        return abab;
      }
      case "lodash": {
        return lodash;
      }
      case "buffer": {
        return { Buffer };
      }
    }
  },
};
