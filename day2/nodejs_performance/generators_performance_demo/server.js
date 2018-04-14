function fib (n) {
    var current = 0, next = 1, swap
    for (var i = 0; i < n; i++) {
      swap = current, current = next
      next = swap + next
    }
    return current
  }

function* fibGen (n) {
    var current = 0, next = 1, swap
    for (var i = 0; i < n; i++) {
      swap = current, current = next
      next = swap + next
      yield current
    }
  }

console.time('test no generators');
fib(20);
console.timeEnd('test no generators');

console.time('test with generators');
for (var n of fibGen(20));
console.timeEnd('test with generators');