/** Domain and contact. Change these two fields when they are decided. */
export const siteConfig = {
  name: 'PBLAND',
  email: 'contact@pbland.example',
  domain: 'pbland.example',
} as const;

export const siteUrl = `https://${siteConfig.domain}`;
