export interface MenuItemType {
  label: string;
  path?: string;
  subItems?: MenuItemType[]; // Optional array for submenus
  disabled?: boolean;
  icon?: React.ReactNode;
}