
import { test as base } from '@playwright/test';
import { NewsPage } from '../pages/news-page';

type PagesFixtures = {
  newsPage: NewsPage;
};

const testPages = base.extend<PagesFixtures>({
  newsPage: async ({ page }, use) => {
    const newsPage = new NewsPage(page);
    await use(newsPage);
  },
});
export const expect = testPages.expect;
export const test = testPages;