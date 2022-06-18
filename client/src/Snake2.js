import { useState, useEffect } from "react";

const SIZE = 15;

// mapping keycode  for changing direction
const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;
const STOP = 32; /* [space] used for pause */

const getRandom = () => {
  return {
    x: Math.floor(Math.random() * SIZE),
    y: Math.floor(Math.random() * SIZE),
  };
};

const emptyRows = () =>
  [...Array(SIZE)].map(() => [...Array(SIZE)].map(() => "grid-item"));

const increaseSpeed = (speed) => speed - 10 * (speed > 10);

function Snake2() {
  const [rows, setRows] = useState(emptyRows());
  const [snake, setSnake] = useState([getRandom()]);
  const [food, setFood] = useState(getRandom());
  const [direction, setDirection] = useState(STOP);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => moveSnake(), speed);
    document.onkeydown = changeDirection;
    document.title = "snake-game";

    isCollapsed();
    isEaten();

    return () => clearInterval(interval);
  }, []);

  const displayRows = rows.map((row, h) =>
    row.map((value, v) => <div name={`${h}=${v}`} className={value} />)
  );

  const moveSnake = () => {
    let snakeCopy = [...snake];
    let head = { ...snakeCopy[snakeCopy.length - 1] };
    switch (direction) {
      case LEFT:
        head.y += -1;
        break;
      case UP:
        head.x += -1;
        break;
      case RIGHT:
        head.y += 1;
        break;
      case DOWN:
        head.x += 1;
        break;
    }
    /* keep the value within range of 0 to HEIGHT */
    head.x += SIZE * ((head.x < 0) - (head.x >= SIZE));
    head.y += SIZE * ((head.y < 0) - (head.y >= SIZE));

    snakeCopy.push(head);
    snakeCopy.shift();
    setSnake(snakeCopy);
    update();
  };

  function changeDirection({ keyCode }) {
    let newDirection = direction;
    switch (keyCode) {
      case LEFT:
        newDirection = direction === RIGHT ? RIGHT : LEFT;
        break;
      case RIGHT:
        newDirection = direction === LEFT ? LEFT : RIGHT;
        break;
      case UP:
        newDirection = direction === DOWN ? DOWN : UP;
        break;
      case DOWN:
        newDirection = direction === UP ? UP : DOWN;
        break;
      case STOP:
        newDirection = STOP;
        break;
    }

    setDirection(newDirection);
  }

  function isEaten() {
    let snakeCopy = [...snake];
    let head = { ...snakeCopy[snakeCopy.length - 1] };
    if (head.x === food.x && head.y === food.y) {
      snakeCopy.push(head);

      setSnake(snakeCopy);
      setFood(getRandom());
      setSpeed(increaseSpeed(speed));
    }
  }

  function update() {
    let newRows = emptyRows();
    snake.forEach((element) => (newRows[element.x][element.y] = "snake"));
    newRows[food.x][food.y] = "food";
    setRows(newRows);
  }

  function isCollapsed() {
    let head = { ...snake[snake.length - 1] };
    for (let i = 0; i < snake.length - 3; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        alert(`game over: ${snake.length * 10}`);
      }
    }
  }

  return (
    <div className="a">
      <h1> Snake v0.1.1</h1>
      <ul>
        <li>press "space" to pause the game.</li>
        <li>press "arrow keys" to change direction/ unpause.</li>
      </ul>
      <div className="snake-container">
        <div className="grid">{displayRows}</div>
      </div>
    </div>
  );
}

export default Snake2;
