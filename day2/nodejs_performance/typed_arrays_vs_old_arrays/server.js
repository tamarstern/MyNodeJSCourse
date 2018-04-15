var buffer = new ArrayBuffer(LIMIT * 4);
var arr2 = new Int32Array(buffer);
console.time("ArrayBuffer insertion time");
for (var i = 0; i < LIMIT; i++) {
    arr2[i] = i;
}
console.timeEnd("ArrayBuffer insertion time");


var arr3 = new Array(LIMIT);
arr3.push({a: 22});
console.time("Array insertion time no JIT optimization");
for (var i = 0; i < LIMIT; i++) {
    arr3[i] = i;
}
console.timeEnd("Array insertion time no JIT optimization");

var buffer = new ArrayBuffer(LIMIT * 4);
var arr5 = new Int32Array(buffer);
console.time("ArrayBuffer insertion time");
for (var i = 0; i <LIMIT; i++) {
    arr5[i] = i;
}
console.time("ArrayBuffer read time");
for (var i = 0; i < LIMIT; i++) {
    var p = arr5[i];
}
console.timeEnd("ArrayBuffer read time");

var arr4 = new Array(LIMIT);
arr4.push({a: 22});
for (var i = 0; i < LIMIT; i++) {
    arr4[i] = i;
}
var p;
console.time("Old array read time");
for (var i = 0; i < LIMIT; i++) {
    //arr[i] = i;
    p = arr4[i];
}
console.timeEnd("Old array read time");


