export function format(first: string, middle: string, last: string): string {
  return (
    (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '')
  );
}

export function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
): { x: number; y: number } {
  const angleInRadians: number = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

export function svgDescribeArc(x, y, radius, flag, startAngle, endAngle) {
  const end: { x: number; y: number } = polarToCartesian(
    x,
    y,
    radius,
    startAngle,
  );
  const largetArcFlag: string = endAngle - startAngle <= 180 ? '0' : '1';
  const d: string = [
    'A',
    radius,
    radius,
    0,
    largetArcFlag,
    flag,
    end.x,
    end.y,
  ].join(' ');

  return d;
}
