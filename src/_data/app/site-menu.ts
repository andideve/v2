import { SITE_PATHS } from '../../config/globals';
import { Menu } from '../../types/defaults';

export const siteMenu: Menu[] = [
  { label: 'Home', to: '/', exact: true },
  // { label: 'About', to: SITE_PATHS.about },
  { label: 'Work', to: SITE_PATHS.work },
  { label: 'Links', to: SITE_PATHS.links },
];

export const extendedSiteMenu: Menu[] = [
  ...siteMenu,
  { label: 'Contact', to: SITE_PATHS.contact },
  { label: 'Archive', to: SITE_PATHS.archive },
  // { label: 'Design', to: SITE_PATHS.design },
  // { label: 'Sitemap', to: SITE_PATHS.sitemap },
];
