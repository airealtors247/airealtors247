
import { createPageUrl } from '@/utils';

const mainAppUrl = 'https://www.airealtors247.io';

export const createMainAppUrl = (pageName, params = {}) => {
  let url = `${mainAppUrl}${createPageUrl(pageName)}`;
  const query = new URLSearchParams(params).toString();
  if (query) {
    url += `?${query}`;
  }
  return url;
};
