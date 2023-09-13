import { Heap } from 'heap-js'

function createBuyQueue() {
  const maxQueue = new Heap<Order>((a, b) => b.amount - a.amount)
  maxQueue.init([])
  return maxQueue
}

function createSellQueue() {
  const minQueue = new Heap<Order>((a, b) => a.amount - b.amount)
  minQueue.init([])

  return minQueue
}

const buyQueue = createBuyQueue()
const sellQueue = createSellQueue()

function insertBuyOrder(v: Order) {
  if (v.timestamp <= Date.now()) {
    return
  }

  const lowestSellOrder = sellQueue.peek()?.amount
  if (!lowestSellOrder || (lowestSellOrder && v.amount < lowestSellOrder)) {
    buyQueue.push(v)
  } else {
    match()
  }
}

function cancelBuyOrder(order: Order) {
  buyQueue.remove(order, (v) => v.id == order.id)
}

function cancelSellOrder(order: Order) {
  sellQueue.remove(order, (v) => v.id == order.id)
}

function insertSellOrder(v: Order) {
  if (v.timestamp <= Date.now()) {
    return
  }
  const highestBuyOrder = buyQueue.peek()?.amount
  if (!highestBuyOrder || (highestBuyOrder && v.amount > highestBuyOrder)) {
    sellQueue.push(v)
  } else {
    match()
  }
}

function match(): { buyPrice: number; sellPrice: number } | null {
  if (buyQueue.length == 0 || sellQueue.length == 0) {
    return null
  }
  const buyOrder = buyQueue.peek() as Order
  const sellOrder = sellQueue.peek() as Order

  if (buyOrder.customerId == sellOrder.customerId) {
    return null
  }

  if (buyOrder.timestamp < Date.now()) {
    buyQueue.pop()
    return null
  }

  if (sellOrder.timestamp < Date.now()) {
    sellQueue.pop()
    return null
  }

  buyQueue.pop()
  sellQueue.pop()

  return { buyPrice: buyOrder.amount, sellPrice: sellOrder.amount }
}

function getBuyOrdersByUserId(customerId: string): Order[] {
  return buyQueue.toArray().filter((v) => v.customerId == customerId)
}

// function logBuyQueue() {
//   console.log(buyQueue)
// }

// function logSellQueue() {
//   console.log(sellQueue)
// }

function clearQueues() {
  buyQueue.clear()
  sellQueue.clear()
}

export {
  buyQueue,
  sellQueue,
  createBuyQueue,
  insertBuyOrder,
  insertSellOrder,
  clearQueues,
}
