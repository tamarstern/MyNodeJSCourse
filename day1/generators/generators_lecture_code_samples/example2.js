function *foo() {
    var x = 1 + (yield "foo");
    console.log(x);
}

var f = foo();
console.log(f.next());
console.log(f.next(5));