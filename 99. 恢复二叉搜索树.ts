// 99. 恢复二叉搜索树
// 给你二叉搜索树的根节点 root ，该树中的 恰好 两个节点的值被错误地交换。请在不改变其结构的情况下，恢复这棵树 。
// 输入：root = [1,3,null,null,2]
// 输出：[3,1,null,null,2]
// 解释：3 不能是 1 的左孩子，因为 3 > 1 。交换 1 和 3 使二叉搜索树有效。

class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

function recoverTree(root: TreeNode | null): void {
  const treeList: TreeNode[] = []
  inOrderTraverseNode(root!, treeList)

  let x: TreeNode | null = null
  let y: TreeNode | null = null

  for (let i = 0; i < treeList.length - 1; i++) {
    if (treeList[i].val > treeList[i + 1].val) {
      y = treeList[i + 1]
      if (x === null) {
        x = treeList[i]
      }
    }
  }
  if (x !== null && y !== null) {
    let tmp = x.val
    x.val = y.val
    y.val = tmp
  }
  function inOrderTraverseNode(node: TreeNode, list: TreeNode[]) {
    if (node == null) {
      return
    }
    inOrderTraverseNode(node.left!, list)
    treeList.push(node)
    inOrderTraverseNode(node.right!, list)
  }
}
