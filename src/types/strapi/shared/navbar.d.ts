export interface MenuItem {
  id: number;
  label: string;
  href: string;
  isExternal: boolean;
}

export interface Navbar {
  id: number;
  logoText: string;
  menuItems: MenuItem[];
}