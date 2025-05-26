import {StyleProp} from 'react-native';

export function ms<T>(
  ...styles: (StyleProp<T> | null | undefined | false)[]
): StyleProp<T> {
  const flat: T[] = [];

  for (const style of styles) {
    if (!style) continue;
    if (Array.isArray(style)) {
      for (const s of style) {
        if (s) flat.push(s as T);
      }
    } else {
      flat.push(style as T);
    }
  }

  return Object.assign({}, ...flat);
}
