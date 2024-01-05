import { useEffect, useState } from "react";
import Node from "./Node";
import ratInMaze from "../Algorithm/ratInMaze";

function Maze(props) {
  const [state, setState] = useState({
    grid: [],
  });

  const [disableBtn, setDisableBtn] = useState(false);

  // let n=5
  let n=5
  // const [n, setN] = useState(5);
  const START_NODE_ROW = 0;
  const START_NODE_COL = 0;
  let FINISH_NODE_ROW = n - 1;
  let FINISH_NODE_COL = n - 1;

  useEffect(() => {
    const grid = generateGrid();
    setState({ grid: grid });
  }, []);

  const generateGrid = () => {
    let grid = [];
    for (let row = 0; row < n; row++) {
      let temp = [];
      for (let col = 0; col < n; col++) {
        temp.push(createNode(row, col));
      }
      grid.push(temp);
    }
    return grid;
  };

  const createNode = (row, col) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      isWall: false,
      isPath: false,
    };
  };

  const handleMouseUp = (row, col) => {
    if(disableBtn==true) return
    const node = grid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    grid[row][col] = newNode;
    setState({ grid: grid });
  };

  const reset = () => {
    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        const node = grid[row][col];
        const newNode = {
          ...node,
          isWall: false,
          isPath: false,
        };
        grid[row][col] = newNode;
      }
    }
    setState({ grid: grid });
  };

  const algoRat = () => {
    const { grid } = state;
    const algo = ratInMaze(grid, 0, 0, n);
    if (algo == null) {
      alert("Path not found");
      return;
    }
    
    setDisableBtn(true);
    const str = algo;

    let row = 0;
    let col = 0;

    for (let i = 0; i < str.length; i++) {
      setTimeout(() => {
        const pos = str[i];
        if (pos == "D") {
          const node = grid[row + 1][col];
          const newNode = {
            ...node,
            isPath: true,
          };
          grid[row + 1][col] = newNode;
          row = row + 1;
        } else if (pos == "U") {
          const node = grid[row - 1][col];
          const newNode = {
            ...node,
            isPath: true,
          };
          grid[row - 1][col] = newNode;
          row = row - 1;
        } else if (pos == "R") {
          const node = grid[row][col + 1];
          const newNode = {
            ...node,
            isPath: true,
          };
          grid[row][col + 1] = newNode;
          col = col + 1;
        } else if (pos == "L") {
          const node = grid[row][col - 1];
          const newNode = {
            ...node,
            isPath: true,
          };
          grid[row][col - 1] = newNode;
          col = col - 1;
        }
        setState({ grid: grid });
        if(i==str.length-1) setDisableBtn(false);
      }, 1000 * i);
    }
  };

  const { grid } = state;
  return (
    <div className="relative flex align-middle flex-col justify-center h-full bg-black">
      <p className=" text-center font-semibold">
      Click on any square to turn it into an obstacle, and click again to undo it.
      </p>
      <p className=" text-center mb-4 font-semibold">
      Once you're happy with your maze, click the "Start" button.
      </p>
      <div className="flex place-content-center w-full">
        {grid &&
          grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, colIdx) => {
                  const { row, col, isStart, isFinish, isWall, isPath } = node;
                  return (
                    <Node
                      key={colIdx}
                      row={row}
                      col={col}
                      isStart={isStart}
                      isFinish={isFinish}
                      isWall={isWall}
                      isPath={isPath}
                      onMouseUp={handleMouseUp}
                    />
                  );
                })}
              </div>
            );
          })}
      </div>

      <div className="w-full flex align-middle justify-center mt-4">
        <button
          onClick={algoRat}
          disabled={disableBtn}
          className="bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-4 rounded"
        >
          Start
        </button>
        <button
          onClick={reset}
          disabled={disableBtn}
          className="bg-blue-600 ml-4 hover:bg-blue-700 font-semibold py-2 px-4 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Maze;
