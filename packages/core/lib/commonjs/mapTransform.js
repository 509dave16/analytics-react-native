"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateMapTransform = void 0;

/**
 * Checks if value is a dictionary like object
 * @param value unknown object
 * @returns typeguard, value is dicitonary
 */
const isDictionary = value => value !== null && value !== undefined && typeof value === 'object' && !Array.isArray(value);
/**
 * Generates a mapTransform function from a keymap and a transform map.
 * The resulting function can be called with any object/dictionary and return
 * a new object with key replacements and value transformations applied
 *
 * @param keyMap A dictionary of key mappings in format: ['OLD':'NEW']
 * @param transformMap A map of transformations by key (new key if the key was replaced)
 * @returns A function that maps keys from an object and transforms its values
 */


const generateMapTransform = (keyMap, transformMap) => {
  const mapTransform = json => {
    // Clone at top level
    const result = {};

    for (const key in json) {
      var _keyMap$key;

      const newKey = (_keyMap$key = keyMap[key]) !== null && _keyMap$key !== void 0 ? _keyMap$key : key;
      let value = json[key];

      if (Array.isArray(value)) {
        value = value.map(nestedValue => {
          if (isDictionary(nestedValue)) {
            return mapTransform(nestedValue);
          }

          return nestedValue;
        });
      } else if (isDictionary(value)) {
        value = mapTransform(value);
      }

      if (newKey in transformMap) {
        value = transformMap[newKey](value);
      }

      result[newKey] = value;
    }

    return result;
  };

  return mapTransform;
};

exports.generateMapTransform = generateMapTransform;
//# sourceMappingURL=mapTransform.js.map