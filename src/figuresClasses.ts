enum Shapes {
  Triangle = 'triangle',
  Circle = 'circle',
  Rectangle = 'rectangle',
}

enum Colors {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
}

export interface Figure {
  shape: Shapes;
  color: Colors;
  getArea: () => number;
}

export function correctLengthChecker(...lengths: number[]): boolean {
  return lengths.every((length: number) => length > 0);
}

export function isTrianglePossible(...sides: number[]): boolean {
  sides.sort((sideA: number, sideB: number) => sideB - sideA);

  return sides[0] < sides[1] + sides[2];
}

export function roundValueToHundrets(number: number): number {
  return Math.floor(number * 100) / 100;
}

export class Triangle {
  readonly shape = Shapes.Triangle;

  constructor(
    public color: Colors,
    public a: number,
    public b: number,
    public c: number,
  ) {
    if (!correctLengthChecker(a, b, c)) {
      throw new Error('Sizes should be positive numbers');
    }

    if (!isTrianglePossible(a, b, c)) {
      throw new Error('Invalid sides size // figure is not a triangle');
    }
  }

  getArea(): number {
    const sidesSemiSum = (this.a + this.b + this.c) / 2;
    const area = (sidesSemiSum
      * (sidesSemiSum - this.a)
      * (sidesSemiSum - this.b)
      * (sidesSemiSum - this.c))
      ** 0.5;

    return roundValueToHundrets(area);
  }
}

export class Circle implements Figure {
  readonly shape = Shapes.Circle;

  constructor(
    public color: Colors,
    public radius: number,
  ) {
    if (!correctLengthChecker(radius)) {
      throw new Error('Radius should be positive number');
    }
  }

  getArea(): number {
    return roundValueToHundrets(Math.PI * this.radius ** 2);
  }
}

export class Rectangle {
  readonly shape = Shapes.Rectangle;

  constructor(
    public color: Colors,
    public width: number,
    public height: number,
  ) {
    if (!correctLengthChecker(width, height)) {
      throw new Error('Sizes should be positive numbers');
    }
  }

  getArea(): number {
    return roundValueToHundrets(this.width * this.height);
  }
}

export function getInfo(figure: Figure): string {
  return `A ${figure.color} ${figure.shape} - ${figure.getArea()}`;
}
