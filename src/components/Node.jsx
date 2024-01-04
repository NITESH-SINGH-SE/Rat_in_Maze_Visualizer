function Node({ row, col, isStart, isFinish, isWall, isPath, onMouseUp}) {
  const extraClass = isFinish
    ? "nodeFinish"
    : isStart
    ? "nodeStart"
    : isPath
    ? "nodePath"
    : isWall
    ? "nodeWall"
    : "";
  return <div id={`node-${row}-${col}`} className={`node ${extraClass}`} onMouseUp={()=>onMouseUp(row, col)}>

  </div>;
}

export default Node;
