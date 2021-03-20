import { newE2EPage } from '@stencil/core/testing';

describe('radial-menu-center', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<radial-menu-center></radial-menu-center>');

    const element = await page.find('radial-menu-center');
    expect(element).toHaveClass('hydrated');
  });
});
