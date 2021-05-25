class Point{
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return "point";
  }
}

const cp = new Point(1, 2);
console.log("cp = " + cp);
