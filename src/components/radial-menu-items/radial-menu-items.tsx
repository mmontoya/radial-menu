import { Component, h, Prop } from '@stencil/core';
import { MenuItem } from '../radial-menu/MenuItem.interface';
import { polarToCartesian } from '../../utils/utils';
import { svgDescribeArc } from '../../utils/utils';

@Component({
  tag: 'radial-menu-items',
  styleUrl: 'radial-menu-items.scss',
  shadow: false,
})
export class RadialMenuItems {
  @Prop() menuItems: Array<MenuItem>;
  @Prop() visible: boolean = false;
  @Prop() isDragging: boolean = false;
  @Prop() color: string;
  @Prop() size: number;

  handleClick(e: MouseEvent, item: any) {
    item.callback();
    e.preventDefault();
    e.stopPropagation();
  }

  getViewBox() {
    const minX = 0;
    const minY = 0;
    const widthX = 100;
    const widthY = 100;
    return `${minX} ${minY} ${widthX} ${widthY}`;
  }

  getPaths() {
    const inner_rad = this.size * 0.2;
    const text_rad = this.size * 0.33;
    // don't exceed the diameter or it will clip
    const outer_rad = this.size * 0.47;
    const halfSize = this.size * 0.5;
    const X0 = halfSize;
    const Y0 = halfSize;
    const total = this.menuItems.length;
    const halfSection = (360 / total) * 0.5;

    return this.menuItems.map((item, index) => (
      <g
        id={`#section_${index + 1}`}
        class="section"
        onClick={event => this.handleClick(event, item)}
        style={{
          stroke: '#1a2333',
          fill: item.color,
          strokeWidth: '4px',
        }}
      >
        <path
          d={
            [
              'M',
              polarToCartesian(X0, Y0, inner_rad, halfSection * (index * 2 + 3))
                .x,
              polarToCartesian(X0, Y0, inner_rad, halfSection * (index * 2 + 3))
                .y,
            ].join(' ') +
            svgDescribeArc(
              halfSize,
              halfSize,
              inner_rad,
              0,
              halfSection * (index * 2 + 1),
              halfSection * (index * 2 + 3),
            ) +
            [
              'L',
              polarToCartesian(X0, Y0, outer_rad, halfSection * (index * 2 + 1))
                .x,
              polarToCartesian(X0, Y0, outer_rad, halfSection * (index * 2 + 1))
                .y,
            ].join(' ') +
            svgDescribeArc(
              halfSize,
              halfSize,
              outer_rad,
              1,
              halfSection * (index * 2 + 3),
              halfSection * (index * 2 + 1),
            ) +
            ['Z'].join(' ')
          }
        />
        <path
          id={`curve_${index + 1}`}
          d={
            [
              'M',
              polarToCartesian(X0, Y0, text_rad, halfSection * (index * 2 + 1))
                .x,
              polarToCartesian(X0, Y0, text_rad, halfSection * (index * 2 + 1))
                .y,
            ].join(' ') +
            svgDescribeArc(
              halfSize,
              halfSize,
              text_rad,
              1,
              halfSection * (index * 2 + 3),
              halfSection * (index * 2 + 1),
            )
          }
          style={{
            stroke: 'transparent',
            strokeWidth: '1px',
            fill: 'none',
          }}
        />
        <text
          text-anchor="middle"
          x={`${(1 / total) * this.size}%`}
          fill={this.color}
          font-size={`${0.025 * (1 / total) * this.size}rem`}
          style={{ cursor: 'pointer', stroke: 'none' }}
        >
          <textPath xlinkHref={`#curve_${index + 1}`}>{item.label}</textPath>
        </text>
      </g>
    ));
  }

  render() {
    const visibleStyle: any = { visibility: 'visible', opacity: 1 };
    const invisibleStyle: any = { visibility: 'hidden', opactiy: 0 };
    return (
      <div
        style={this.visible ? visibleStyle : invisibleStyle}
        class={this.isDragging ? 'dragging' : ''}
      >
        <svg
          viewBox={this.getViewBox()}
          id="menu"
          width={this.size}
          height={this.size}
        >
          <g transform={`scale(${100 / this.size})`}>{this.getPaths()}</g>
        </svg>
      </div>
    );
  }
}
