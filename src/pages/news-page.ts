import { BasePage } from './base-page';

export class NewsPage extends BasePage {
  async goToNewest() {
    await this.page.goto('https://news.ycombinator.com/newest');
  }

async scrapeHeadlines() {
    return await this.page.$$eval('tr.athing', rows => {
      return rows.map(row => {
        const titleElement = row.querySelector<HTMLAnchorElement>('td.titleline a');
        const dateElement = row.nextElementSibling?.querySelector<HTMLSpanElement>('span.age');
        return {
          title: titleElement?.textContent?.trim() || '',
          url: titleElement?.href || '',
          date: dateElement ? new Date(dateElement.title) : new Date()
        };
      });
    });
}
async goToNextPage(): Promise<boolean> {
    const nextPageLink = await this.page.$('a.morelink');
    if (nextPageLink) {
      await nextPageLink.click();
      return true;
    }
      return false;
  }
}

