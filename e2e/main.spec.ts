import {expect, assert} from 'chai';
import {SpectronClient} from 'spectron';

import commonSetup from './common-setup';

describe('surv-shell App', function () {
  commonSetup.apply(this);

  let browser: any;
  let client: SpectronClient;

  beforeEach(function () {
    client = this.app.client;
    browser = client as any;
  });

  it('should display message saying Выберите папку', async function () {
    const text = await browser.getText('app-main header');
    expect(text).to.equal('Выберите папку');
  });


  it('creates initial windows', async function () {
    const count = await client.getWindowCount();
    expect(count).to.equal(1);
  });

});
