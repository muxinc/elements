type KeyTypes = string | number | symbol;

// Type Guard to determine if a given key is actually a key of some object of type T
export const isKeyOf = <T = any>(k: KeyTypes, o: T): k is keyof T => {
  return k in o;
};
