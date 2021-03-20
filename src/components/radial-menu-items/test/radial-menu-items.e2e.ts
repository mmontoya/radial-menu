import { newE2EPage } from '@stencil/core/testing';

describe('radial-menu-items', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<radial-menu-items></radial-menu-items>');

    const element = await page.find('radial-menu-items');
    expect(element).toHaveClass('hydrated');
  });
});
