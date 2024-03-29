// 1996. 游戏中弱角色的数量
// 你正在参加一个多角色游戏，每个角色都有两个主要属性：攻击 和 防御 。给你一个二维整数数组 properties ，其中 properties[i] = [attacki, defensei] 表示游戏中第 i 个角色的属性。

// 如果存在一个其他角色的攻击和防御等级 都严格高于 该角色的攻击和防御等级，则认为该角色为 弱角色 。更正式地，如果认为角色 i 弱于 存在的另一个角色 j ，那么 attackj > attacki 且 defensej > defensei 。

// 返回 弱角色 的数量。

// 示例 1：

// 输入：properties = [[5,5],[6,3],[3,6]]
// 输出：0
// 解释：不存在攻击和防御都严格高于其他角色的角色。
// 示例 2：

// 输入：properties = [[2,2],[3,3]]
// 输出：1
// 解释：第一个角色是弱角色，因为第二个角色的攻击和防御严格大于该角色。

function numberOfWeakCharacters(properties: number[][]): number {
  let num = 0

  // 攻击从小到大；后面的角色防御力大就是强角色
  // 防御从大到小: 攻击力相同的，不影响
  const cloneProperties = properties.sort((a, b) => {
    if (a[0] === b[0]) {
      return b[1] - a[1]
    }
    return a[0] - b[0]
  })

  // 单调递增栈
  const defStack: number[] = []
  for (const p of cloneProperties) {
    // 后面的角色防御力大
    while (defStack.length && defStack[defStack.length - 1] < p[1]) {
      defStack.pop()
      num++
    }
    defStack.push(p[1])
  }

  return num
}
