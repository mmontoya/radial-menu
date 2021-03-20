import { newSpecPage } from '@stencil/core/testing';
import { RadialMenu } from '../radial-menu';

describe('radial-menu', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RadialMenu],
      html: `<radial-menu></radial-menu>`,
    });
    expect(page.root).toEqualHtml(`
      <radial-menu>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </radial-menu>
    `);
  });
});
