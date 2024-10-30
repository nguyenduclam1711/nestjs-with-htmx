import { InputProps } from '.';

export const MAP_INPUT_VARIANTS_TO_CLASSNAME: Record<
  NonNullable<InputProps['color']>,
  string
> = {
  default: '',
  primary: 'input-primary',
  secondary: 'input-secondary',
  accent: 'input-accent',
  info: 'input-info',
  success: 'input-success',
  warning: 'input-warning',
  error: 'input-error',
};

export const MAP_INPUT_SIZES_TO_CLASSNAME: Record<
  NonNullable<InputProps['sizeInput']>,
  string
> = {
  xs: 'input-xs max-w-xs',
  sm: 'input-sm max-w-sm',
  md: 'input-md max-w-md',
  lg: 'input-lg max-w-lg',
};
