import { describe, expect, test } from '@jest/globals'

import {
  buyQueue,
  sellQueue,
  insertBuyOrder,
  insertSellOrder,
  clearQueues,
} from './orderbook'
import { Heap } from 'heap-js'

const mockOrderWithInvalidTimestamp = {
  id: '1',
  customerId: '1',
  timestamp: 99999,
  amount: 100,
}

const mockBuyOrder = {
  id: '1',
  customerId: '1',
  timestamp: Date.now() + 3600,
  amount: 100,
}

const mockSellOrder = {
  id: '1',
  customerId: '100',
  timestamp: Date.now() + 3600,
  amount: 200,
}

describe('orderbook', () => {
  describe('insertBuyOrder', () => {
    test('invalid timestamp', () => {
      expect(insertBuyOrder(mockOrderWithInvalidTimestamp)).toEqual(undefined)
      expect(buyQueue.length).toEqual(0)
    })

    test('insert buyOrder to queue when sellQueue is empty', () => {
      insertBuyOrder(mockBuyOrder)

      expect(buyQueue.length).toEqual(1)
    })

    test('insert buyOrder to queue when its amount is less than the lowest sellOrder', () => {
      insertSellOrder(mockSellOrder)
      insertBuyOrder(mockBuyOrder)

      expect(buyQueue.length).toEqual(2)
    })
  })

  describe('insertSellOrder', () => {
    test('invalid timestamp', () => {
      const beforeSellQueueLength = sellQueue.length
      expect(insertSellOrder(mockOrderWithInvalidTimestamp)).toEqual(undefined)
      expect(sellQueue.length).toEqual(beforeSellQueueLength)
    })

    test('insert sellOrder to queue when buyQueue is empty', () => {
      clearQueues()
      const beforeSellQueueLength = sellQueue.length
      insertSellOrder(mockSellOrder)

      expect(sellQueue.length).toEqual(beforeSellQueueLength + 1)
    })

    test('insert sellOrder to queue when its amount is greater than the highest buyOrder', () => {
      insertBuyOrder(mockBuyOrder)

      const beforeSellQueueLength = sellQueue.length

      insertSellOrder(mockSellOrder)

      expect(sellQueue.length).toEqual(beforeSellQueueLength + 1)
    })
  })
})
