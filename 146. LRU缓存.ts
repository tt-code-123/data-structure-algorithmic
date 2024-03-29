class DoubleLinkListNode<T> {
  public value: T
  public next: DoubleLinkListNode<T> | undefined
  public pre: DoubleLinkListNode<T> | undefined

  constructor(value: T) {
    this.value = value
    this.next = undefined
    this.pre = undefined
  }
}

class DoubleLinkList<T> {
  public head: DoubleLinkListNode<T> | undefined
  public tail: DoubleLinkListNode<T> | undefined
  public count: number

  constructor() {
    this.head = undefined
    this.tail = undefined
    this.count = 0
  }

  public push(val: T) {
    const element = new DoubleLinkListNode(val)
    if (this.head === undefined) {
      this.head = element
      this.tail = element
    } else {
      element.pre = this.tail
      this.tail!.next = element
      this.tail = element
    }
    this.count++
  }

  public removeAt(index: number) {
    if (index >= 0 && index < this.count) {
      let current = this.head
      if (index === 0) {
        this.head = this.head?.next
        if (this.head?.pre) {
          this.head.pre = undefined
        }
        if (this.count === 1) {
          this.tail = undefined
        } else if (this.count === 2) {
          this.tail = this.head
        }
      } else if (index === this.count - 1) {
        current = this.tail
        this.tail = current!.pre
        this.tail!.next = undefined
      } else {
        let previous: DoubleLinkListNode<T> | undefined = undefined
        for (let i = 0; i < index; i++) {
          previous = current
          current = current?.next
        }
        previous!.next = current?.next
        current!.next!.pre = previous!
      }
      this.count--
      return current?.value
    }
    return undefined
  }
}

// 146. LRU 缓存
// 请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
// 实现 LRUCache 类：
// LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
// int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
// void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
// 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。

// 示例：

// 输入
// ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
// [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
// 输出
// [null, null, null, 1, null, -1, null, -1, 3, 4]

// 解释
// LRUCache lRUCache = new LRUCache(2);
// lRUCache.put(1, 1); // 缓存是 {1=1}
// lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
// lRUCache.get(1);    // 返回 1
// lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
// lRUCache.get(2);    // 返回 -1 (未找到)
// lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
// lRUCache.get(1);    // 返回 -1 (未找到)
// lRUCache.get(3);    // 返回 3
// lRUCache.get(4);    // 返回 4

class LRUCache<T = any> {
  // 缓存数
  public capacity: number
  // 双向链表
  public doubleLinkList: DoubleLinkList<T>

  constructor(capacity: number) {
    this.capacity = capacity
    this.doubleLinkList = new DoubleLinkList<T>()
  }

  get(key: number): number {
    let current = this.doubleLinkList.tail
    let num: number = -1
    let index = this.doubleLinkList.count - 1

    // 寻找查找的值
    while (current || current!?.pre) {
      let valueKey = (current.value as any).key as number
      if (valueKey === key) {
        num = (current.value as any).value
        break
      }
      current = current.pre
      index--
    }
    // 查找到值
    if (num !== -1) {
      // 删除查找到的值
      this.doubleLinkList.removeAt(index)
      // 插入查找到的值
      this.doubleLinkList.push(current?.value!)
    }
    return num
  }

  put(key: number, value: number): void {
    let node = this.doubleLinkList.head
    let index = 0
    // 查找是否有相同的值
    while (node?.next !== undefined || node) {
      const currentValue = node?.value as { key: number; value: number }
      if (currentValue?.key === key) {
        currentValue.value = value
        this.doubleLinkList.removeAt(index)
        this.doubleLinkList.push(currentValue as any)
        return
      }
      node = node?.next
      index++
    }

    if (this.doubleLinkList.count === this.capacity) {
      this.doubleLinkList.head = this.doubleLinkList.head?.next
      if (this.doubleLinkList.head?.pre) {
        this.doubleLinkList.head.pre = undefined
      }
      this.doubleLinkList.count--
    }
    let obj: any = {
      key,
      value,
    }
    this.doubleLinkList.push(obj)
  }
}
