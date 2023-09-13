- Data structure used to store buy orders: Max Heap
- Data structure used to store sell orders: Min Heap
- Time complexity of operations in average case:

* Insertion: O(log(n))
* Deletion: O(log(n))
* Retrieving the max/min value: O(1)
* Searching: O(n)

- For simplicity's sake, let's assume that expired orders still sit in queues till they are popped out but won't be treated as matched orders
- Unit tests covered `insertBuyOrder` and `insertSellOrder` functions
- Run unit test `npm run test`
- Whenever an order is added to buyQueue or sellQueue, `match()` function will be triggered. If this function return `null`, no matching happens. Otherwise it will return an object like this

```javascript
{
  buyPrice: number
  sellPrice: number
}
```

\*\*\* Due to time limitation, the code is duplicate somewhere and not clean :((((
