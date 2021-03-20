import { Component, Prop, h } from '@stencil/core';
import { Position } from '../radial-menu/Position.interface';

@Component({
  tag: 'radial-menu-center',
  styleUrl: 'radial-menu-center.scss',
  shadow: false,
})
export class RadialMenuCenter {
  pos: Position;

  @Prop() color: string;
  @Prop() size: number;

  render() {
    // Note: if Viewbox is 100 then the circle's width will be determined by width of svg
    return (
      <div style={{ cursor: 'pointer' }}>
        <svg
          width={this.size * 0.35}
          height={this.size * 0.35}
          viewBox="0 0 100 100"
        >
          <g
            id="hamburger-menu"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <circle
              id="circle"
              cx="50"
              cy="50"
              r="50"
              stroke="none"
              fill={this.color}
            ></circle>
            <g
              id="hamburger-group"
              transform="translate(29.000000, 35.000000)"
              stroke="#FFFFFF"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="8"
            >
              <polyline
                id="line1"
                points="0 0.5 1.65294736 0.5 25.895656 0.5 29.7343575 0.5 32.7567117 0.5 39.7314952 0.5 41.4888229 0.5 42.8706931 0.5 43 0.5"
              ></polyline>
              <polyline
                id="line2"
                points="0 15.5 1.65294736 15.5 25.895656 15.5 29.7343575 15.5 32.7567117 15.5 39.7314952 15.5 41.4888229 15.5 42.8706931 15.5 43 15.5"
              ></polyline>
              <polyline
                id="line3"
                points="0 30.5 1.65294736 30.5 25.895656 30.5 29.7343575 30.5 32.7567117 30.5 39.7314952 30.5 41.4888229 30.5 42.8706931 30.5 43 30.5"
              ></polyline>
            </g>
          </g>
        </svg>
      </div>
    );
  }
}
