let possiblePaths=new Set()
const ratInMaze = (grid, x, y, N)=> {
    // console.log(x, y)
    let vis = matrix(N);
    possiblePaths = new Set()
    solve(grid, x, y, N, vis, "")
    if(possiblePaths.size == 0)
    {
        return null
    }
    console.log(possiblePaths)

    let arr = [];
    for(let element of possiblePaths)
    {
        arr.push(element);
    }
    let mini = 100;
    let res;
    for (let i = 0; i < arr.length; i++) {
        if(mini>arr[i].length)
        {
            mini=arr[i].length;
            res=arr[i]
        }
    }
    return res;
}

export default ratInMaze;

const solve = (grid, x, y, n, vis, path)=>{
    if(x==n-1 && y==n-1 && grid[x][y].isFinish){
        possiblePaths.add(path);
        return;
    }

    if(vis[x][y]==1)    return;

    vis[x][y] = 1;
    
    if(isSafe(x-1, y, grid, n, vis)){
        path = path + "U";
        solve(grid, x-1, y, n, vis, path)
        path = path.substring(0, path.length-1);
    }

    if(isSafe(x, y-1, grid, n, vis)){
        path = path + "L";
        solve(grid, x, y-1, n, vis, path)
        path = path.substring(0, path.length-1);
    }
    if(isSafe(x, y+1, grid, n, vis)){
        path = path + "R";
        solve(grid, x, y+1, n, vis, path)
        path = path.substring(0, path.length-1);
    }

    if(isSafe(x+1, y, grid, n, vis)){
        path = path + "D";
        solve(grid, x+1, y, n, vis, path)
        path = path.substring(0, path.length-1);
    }

    vis[x][y]=0;
}

const matrix = (N)=>{
    let result = []
    for (let i = 0; i < N; i++) {
        result.push(new Array(N).fill(0))
    }
    return result;
}

const isSafe = (row, col, grid, n, vis) =>{
    if(
        row==-1 ||
        row==n ||
        col==-1 ||
        col==n ||
        vis[row][col] ||
        grid[row][col].isWall
    )
        return false;

    return true;
}

