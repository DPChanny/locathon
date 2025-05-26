import {ImageStyle, StyleProp, TextStyle, ViewStyle} from 'react-native';

export function ms<T>(
  ...styles: (StyleProp<T> | null | undefined | false)[]
): StyleProp<T> {
  return styles.filter(Boolean) as StyleProp<T>;
}
