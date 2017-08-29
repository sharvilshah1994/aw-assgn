import { Assign1Page } from './app.po';

describe('assign1 App', () => {
  let page: Assign1Page;

  beforeEach(() => {
    page = new Assign1Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
