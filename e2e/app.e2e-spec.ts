import { BlaPage } from './app.po';

describe('bla App', () => {
  let page: BlaPage;

  beforeEach(() => {
    page = new BlaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
