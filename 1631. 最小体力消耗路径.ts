// 1631. 最小体力消耗路径
// 你准备参加一场远足活动。给你一个二维 rows x columns 的地图 heights ，其中 heights[row][col] 表示格子 (row, col) 的高度。一开始你在最左上角的格子 (0, 0) ，且你希望去最右下角的格子 (rows-1, columns-1) （注意下标从 0 开始编号）。你每次可以往 上，下，左，右 四个方向之一移动，你想要找到耗费 体力 最小的一条路径。

// 一条路径耗费的 体力值 是路径上相邻格子之间 高度差绝对值 的 最大值 决定的。

// 请你返回从左上角走到右下角的最小 体力消耗值 。

// 输入：heights = [[1,2,2],[3,8,2],[5,3,5]]
// 输出：2
// 解释：路径 [1,3,5,3,5] 连续格子的差值绝对值最大为 2 。
// 这条路径比路径 [1,2,2,2,5] 更优，因为另一条路径差值最大值为 3 。

var minimumEffortPath = function (heights: number[][]) {
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]

  // 高度范围为0-100000
  let left = 0
  let right = 999999
  let ans = 0
  const m = heights.length
  const n = heights[0].length

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    const queue = [[0, 0]]
    // 记录是否访问过
    const seen = new Array(m * n).fill(0)
    seen[0] = 1
    while (queue.length) {
      const [x, y] = queue.shift()!
      for (let i = 0; i < 4; i++) {
        const nx = x + dirs[i][0]
        const ny = y + dirs[i][1]
        // 访问过或者越界或者高度差大于mid则跳过
        if (
          nx >= 0 &&
          nx < m &&
          ny >= 0 &&
          ny < n &&
          !seen[nx * n + ny] &&
          Math.abs(heights[x][y] - heights[nx][ny]) <= mid
        ) {
          queue.push([nx, ny])
          seen[nx * n + ny] = 1
        }
      }
    }
    // 如果能到达终点，则更新 ans，缩小搜索范围
    if (seen[m * n - 1]) {
      // 搜索范围缩小到 [left, mid-1]
      ans = mid
      right = mid - 1
    } else {
      // 如果不能到达终点，则增大搜索范围
      left = mid + 1
    }
  }
  return ans
}
