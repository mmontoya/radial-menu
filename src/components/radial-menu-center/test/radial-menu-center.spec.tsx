import { newSpecPage } from '@stencil/core/testing';
import { RadialMenuCenter } from '../radial-menu-center';

describe('radial-menu-center', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RadialMenuCenter],
      html: `<radial-menu-center></radial-menu-center>`,
    });
    expect(page.root).toEqualHtml(`
      <radial-menu-center>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </radial-menu-center>
    `);
  });
});
