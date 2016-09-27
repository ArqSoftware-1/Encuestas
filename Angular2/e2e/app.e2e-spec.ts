import { EncuestasAppPage } from './app.po';

describe('encuestas-app App', function() {
  let page: EncuestasAppPage;

  beforeEach(() => {
    page = new EncuestasAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
