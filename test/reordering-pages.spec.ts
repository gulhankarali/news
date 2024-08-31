import { test, expect } from '../src/config/pages-fixtures';

type Headline = {
  title: string;
  url: string;
  date: Date;
};

test.describe('Reordering the news headlines', () => {

  test('Scrape and sort headlines by date', async ({ newsPage }) => {

    await newsPage.goToNewest();

    let allHeadlines: Headline[] = [];
    let hasNextPage = true;

    while (hasNextPage) {
      const headlines = await newsPage.scrapeHeadlines();
      allHeadlines.push(...headlines);
      hasNextPage = await newsPage.goToNextPage();
    }

    const sortedHeadlines = allHeadlines.sort((a, b) => b.date.getTime() - a.date.getTime());

    console.log(sortedHeadlines);

    expect(sortedHeadlines.length).toBeGreaterThan(0);
  });

});

