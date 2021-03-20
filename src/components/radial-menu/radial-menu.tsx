import { Component, Prop, h, State } from '@stencil/core';
import { Position } from './Position.interface';

export interface MenuItem {
  color: string;
  label: string;
  callback: Function;
}

@Component({
  tag: 'radial-menu',
  styleUrl: 'radial-menu.scss',
  shadow: false,
})
export class RadialMenu {
  constructor() {
    this.pos = JSON.parse(localStorage.getItem('radial-menu-pos')) || {
      x: 10,
      y: 10,
    };
    this.lastPos = this.pos;
  }

  handleToggle() {
    this.isMenuVisible = !this.isMenuVisible;
  }
  onMouseMove(e: MouseEvent) {
    if (!this.dragging) return;
    const pos: Position = {
      x: e.pageX - this.rel.x - 20, // half of inner circle width
      y: e.pageY - this.rel.y - 20,
    };
    this.pos = pos;
    localStorage.setItem('radial-menu-pos', JSON.stringify(pos));

    e.stopPropagation();
    e.preventDefault();
  }

  onMouseDown(e: MouseEvent) {
    // only listen for left mouse button
    if (e.button !== 0) return;

    // get the position of the element
    const element: {
      x: number;
      y: number;
      top: number;
      left: number;
    } = { x: e.x, y: e.y, top: e.y, left: e.x };
    // Client rectangle won't update
    //document.querySelector('radial-menu').getBoundingClientRect();

    let pos: { x: number; y: number; top: number; left: number } = element;
    this.dragging = true;
    this.rel = { x: e.pageX - pos.left, y: e.pageY - pos.top };

    e.stopPropagation();
    e.preventDefault();
  }

  onMouseUp(e: MouseEvent) {
    if (e.button !== 0) return;
    this.dragging = false;
    // Are we in the same location as on mouse down?
    if (this.pos.x === this.lastPos.x && this.pos.y === this.lastPos.y) {
      this.handleToggle();
    } else {
    }
    this.lastPos.x = this.pos.x;
    this.lastPos.y = this.pos.y;

    e.stopPropagation();
    e.preventDefault();
  }

  @State() dragging: boolean = false;
  @State() rel: Position = { x: 0, y: 0 };
  @State() isMenuVisible: boolean = false;
  @State() pos: Position;
  @State() lastPos: Position;

  @Prop() menuItems: Array<MenuItem>;
  @Prop() centerColor: string;
  @Prop() fontColor: string;
  @Prop() size: number;

  componentDidLoad() {
    document.addEventListener('mousemove', (e: MouseEvent) =>
      this.onMouseMove(e),
    );
    document.addEventListener('mouseup', (e: MouseEvent) => this.onMouseUp(e));
  }

  render() {
    return (
      <div
        class="radialMenu"
        id="radialMenu"
        onMouseDown={(e: MouseEvent) => this.onMouseDown(e)}
        onMouseUp={(e: MouseEvent) => this.onMouseUp(e)}
        style={{
          position: 'relative',
          left: this.pos.x + 'px',
          top: this.pos.y + 'px',
        }}
      >
        <radial-menu-center
          color={this.centerColor}
          size={this.size}
        ></radial-menu-center>
        <radial-menu-items
          color={this.fontColor}
          class="menu-items"
          style={{
            position: 'absolute',
            // Offset is half of center circle width (0.35 of 100) -half of stroke width (4px)
            top: `-${
              this.size * 0.5 - this.size * 0.35 * 0.5 - (0.3 * this.size) / 100
            }px`,
            left: `-${
              this.size * 0.5 - this.size * 0.35 * 0.5 - (0.3 * this.size) / 100
            }px`,
          }}
          menuItems={this.menuItems}
          visible={this.isMenuVisible}
          isDragging={this.dragging}
          size={this.size}
        ></radial-menu-items>
      </div>
    );
  }
}
