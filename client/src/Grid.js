import "./Grid.css";

function Grid() {
  function renderGrid(size) {
    let cells = [];
    for (let i = 0; i < size; i++) {
      for (let n = 0; n < size; n++) {
        cells.push(<div className="cell" key={i}></div>);
      }
    }

    return cells;
  }

  return (
    <section className="grid-wrapper">
      <div className="grid">
        {renderGrid(15)}
        <div className="snake-head cell"></div>
      </div>
    </section>
  );
}

export default Grid;
