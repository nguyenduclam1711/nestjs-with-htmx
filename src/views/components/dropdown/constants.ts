import { DropdownProps } from '.';

export const MAP_DROPDOWN_POSITIONS_CLASSNAME: Record<
  NonNullable<DropdownProps['position']>,
  string
> = {
  top: 'dropdown-top',
  left: 'dropdown-left',
  right: 'dropdown-right',
  bottom: 'dropdown-bottom',
};

export const MAP_DROPDOWN_ALIGNS_CLASSNAME: Record<
  NonNullable<DropdownProps['align']>,
  string
> = {
  end: 'dropdown-end',
  begin: 'dropdown-begin',
};
