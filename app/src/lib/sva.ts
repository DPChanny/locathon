import {ViewStyle, TextStyle, ImageStyle} from 'react-native';

type StyleObject = ViewStyle | TextStyle | ImageStyle;
type Variants = Record<string, Record<string, string>>;
export type StyleMap = Record<string, Record<string, StyleObject>>;

type SvaReturn<TVariants extends Variants> = {
  (selected?: Record<string, string | undefined>): Record<string, StyleObject>;
  variants: TVariants;
};

export function sva<TVariants extends Variants>(
  base: string,
  styles: StyleMap,
  config: {
    variants: TVariants;
    defaultVariants?: Record<string, string>;
  },
): SvaReturn<TVariants> {
  const fn = (selected?: Record<string, string | undefined>) => {
    const keys = [base];
    const variants = selected ?? {};

    for (const variantKey of Object.keys(config.variants)) {
      const rawValue = variants[variantKey];
      const fallbackValue = config.defaultVariants?.[variantKey];
      const value = rawValue !== undefined ? rawValue : fallbackValue;

      if (value !== undefined) {
        const key = config.variants[variantKey]?.[value];
        if (key) keys.push(key);
      }
    }

    const grouped: Record<string, StyleObject[]> = {};
    for (const key of keys) {
      const styleEntry = styles[key];
      if (styleEntry) {
        for (const role in styleEntry) {
          if (!grouped[role]) grouped[role] = [];
          grouped[role].push(styleEntry[role]);
        }
      }
    }

    const result: Record<string, StyleObject> = {};
    for (const role in grouped) {
      result[role] = Object.assign({}, ...grouped[role]);
    }

    return result;
  };

  (fn as SvaReturn<TVariants>).variants = config.variants;

  return fn as SvaReturn<TVariants>;
}

export type VariantProps<
  T extends {variants: Record<string, Record<string, string>>},
> = {
  [K in keyof T['variants']]?: keyof T['variants'][K];
};
