import { newE2EPage } from '@stencil/core/testing';

describe('radial-menu', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<radial-menu></radial-menu>');

    const element = await page.find('radial-menu');
    expect(element).toHaveClass('hydrated');
  });
});
