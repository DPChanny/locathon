import {StyleMap} from '@/lib/sva';
import {colors} from '@/styles/tokens/colors';
import {spacing} from '@/styles/tokens/spacing';

export const styles: StyleMap = {
  button: {
    button: {borderRadius: 8, alignItems: 'center'},
    text: {fontWeight: 'bold'},
  },
  'button--primary': {
    button: {backgroundColor: colors.primary},
    text: {color: colors.white},
  },
  'button--ghost': {
    button: {backgroundColor: 'transparent', borderWidth: 1},
    text: {color: colors.primary},
  },
  'button--sm': {
    button: {paddingVertical: spacing.sm, paddingHorizontal: spacing.sm * 2},
  },
  'button--lg': {
    button: {paddingVertical: spacing.lg, paddingHorizontal: spacing.lg * 2},
    icon: {width: 24, height: 24},
  },
};
