import {ViewStyle, TextStyle, ImageStyle} from 'react-native';

export type StyleObject = ViewStyle | TextStyle | ImageStyle;
export type RoleStyle = Record<string, StyleObject>;

export type StyleMap<TRole extends RoleStyle> = {
  [variantKey: string]: Partial<TRole>;
};

export type Variants<TRole extends RoleStyle> = Record<
  string,
  Record<string, Partial<TRole>>
>;

export type SvaReturn<
  TRole extends RoleStyle,
  TVariants extends Variants<TRole>,
> = {
  (selected?: Partial<{[K in keyof TVariants]: keyof TVariants[K]}>): TRole;
  variants: TVariants;
};

export function sva<TRole extends RoleStyle, TVariants extends Variants<TRole>>(
  baseStyle: TRole,
  config: {
    variants: TVariants;
    defaultVariants?: Partial<{
      [K in keyof TVariants]: keyof TVariants[K];
    }>;
  },
): SvaReturn<TRole, TVariants> {
  const fn = (
    selected?: Partial<{[K in keyof TVariants]: keyof TVariants[K]}>,
  ): TRole => {
    const grouped: Record<string, StyleObject[]> = {};
    for (const role in baseStyle) {
      grouped[role] = [baseStyle[role]];
    }

    const variants = selected ?? {};
    const defaultVariants = config.defaultVariants ?? {};

    (Object.keys(config.variants) as (keyof TVariants)[]).forEach(
      variantKey => {
        const fromSelected = (
          variants as Partial<{[K in keyof TVariants]: keyof TVariants[K]}>
        )[variantKey];
        const fromDefault = Object.prototype.hasOwnProperty.call(
          defaultVariants,
          variantKey,
        )
          ? (
              defaultVariants as Partial<{
                [K in keyof TVariants]: keyof TVariants[K];
              }>
            )[variantKey]
          : undefined;

        const variantValue = fromSelected ?? fromDefault;

        if (!variantValue) return;

        const variantStyles = config.variants[variantKey][variantValue];
        if (!variantStyles) return;

        for (const role in variantStyles) {
          if (!grouped[role]) grouped[role] = [];
          grouped[role].push(variantStyles[role]!);
        }
      },
    );

    const result: TRole = {} as TRole;
    for (const role in grouped) {
      (result as Record<string, StyleObject>)[role] = Object.assign(
        {},
        ...grouped[role],
      );
    }

    return result;
  };

  (fn as SvaReturn<TRole, TVariants>).variants = config.variants;
  return fn as SvaReturn<TRole, TVariants>;
}

export type VariantProps<
  T extends {variants: Record<string, Record<string, any>>},
> = {
  [K in keyof T['variants']]?: keyof T['variants'][K];
};
