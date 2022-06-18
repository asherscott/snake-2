import "./Grid.css";

function Grid() {
  const HEIGHT = 10;
  const WIDTH = 10;

  const emptyRows = () =>
    [...Array(WIDTH)].map((_) => [...Array(HEIGHT)].map((_) => "grid-item"));

  const displayRows = emptyRows.map((row, i) =>
    row.map((value, j) => <div name={`${i}=${j}`} className={value} />)
  );

  return (
    <div className="snake-container">
      <div className="grid">{displayRows}</div>
    </div>
  );
}

export default Grid;
