import { newSpecPage } from '@stencil/core/testing';
import { RadialMenuItems } from '../radial-menu-items';

describe('radial-menu-items', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RadialMenuItems],
      html: `<radial-menu-items></radial-menu-items>`,
    });
    expect(page.root).toEqualHtml(`
      <radial-menu-items>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </radial-menu-items>
    `);
  });
});
