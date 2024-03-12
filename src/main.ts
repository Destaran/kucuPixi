import { Application, Graphics } from "pixi.js";

function getDirection(fromCricle: Graphics, toCircle: Graphics) {
  const { x: x1, y: y1 } = fromCricle.getBounds();
  const { x: x2, y: y2 } = toCircle.getBounds();

  const distX = x1 - x2;
  const distY = y1 - y2;
  const distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));

  const direction = {
    x: distX / distance,
    y: distY / distance,
  };

  return direction;
}

function circleCollision(circle1: Graphics, circle2: Graphics): boolean {
  const { x: x1, y: y1, width: width1 } = circle1.getBounds();
  const r1 = width1 / 2;
  const { x: x2, y: y2, width: width2 } = circle2.getBounds();
  const r2 = width2 / 2;

  const distX = x1 - x2;
  const distY = y1 - y2;
  const distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));

  const collision = distance <= r1 + r2;
  return collision;
}

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ antialias: true, resizeTo: window });

  // Append the application canvas to the document body
  document.body.appendChild(app.canvas);

  // Circle1
  const circle1 = new Graphics();
  circle1.circle(100, 200, 50);
  circle1.fill(0xff0000, 1);

  // Circle2
  const circle2 = new Graphics();
  circle2.circle(300, 600, 50);
  circle2.fill(0x0000ff, 1);

  // Add the circles to the stage
  app.stage.addChild(circle1);
  app.stage.addChild(circle2);

  // FPS counter

  let previousFrame = Date.now();

  // Render loop
  app.ticker.add(() => {
    const { x: xVel1, y: yVel1 } = getDirection(circle2, circle1);
    const { x: xVel2, y: yVel2 } = getDirection(circle1, circle2);

    if (!circleCollision(circle1, circle2)) {
      circle1.x += xVel1;
      circle1.y += yVel1;
      circle2.x += xVel2;
      circle2.y += yVel2;
    }

    let currentFrame = Date.now();
    let frameLength = currentFrame - previousFrame;
    let fps = 1000 / frameLength;
    previousFrame = currentFrame;
    console.log(Math.floor(fps));
  });
})();
