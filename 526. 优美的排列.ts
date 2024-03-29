// 526. 优美的排列
// 假设有从 1 到 n 的 n 个整数。用这些整数构造一个数组 perm（下标从 1 开始），只要满足下述条件 之一 ，该数组就是一个 优美的排列 ：

// perm[i] 能够被 i 整除
// i 能够被 perm[i] 整除
// 给你一个整数 n ，返回可以构造的 优美排列 的 数量 。

// 示例 1：

// 输入：n = 2
// 输出：2
// 解释：
// 第 1 个优美的排列是 [1,2]：
//     - perm[1] = 1 能被 i = 1 整除
//     - perm[2] = 2 能被 i = 2 整除
// 第 2 个优美的排列是 [2,1]:
//     - perm[1] = 2 能被 i = 1 整除
//     - i = 2 能被 perm[2] = 1 整除
// 示例 2：

// 输入：n = 1
// 输出：1

function countArrangement(n: number): number {
  let num = 0
  const arr: number[] = []
  for (let i = 1; i <= n; i++) {
    arr.push(i)
  }
  function permutation(tempList: number[], array: number[]) {
    if (array.length === 0) {
      let isGraceful = true
      for (let i = 0; i < tempList.length; i++) {
        if (tempList[i] % (i + 1) !== 0 && (i + 1) % tempList[i] !== 0) {
          isGraceful = false
          break
        }
      }
      if (isGraceful) {
        isGraceful = true
        num++
      }
      return
    }

    for (let i = 0; i < array.length; i++) {
      tempList.push(array[i])
      const remainingNums = [...array]
      remainingNums.splice(i, 1)

      permutation(tempList, remainingNums)

      tempList.pop()
    }
  }
  permutation([], arr)
  return num
}
